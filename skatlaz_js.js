var _addr_json = 'false';
var _data_json = 'false';
var _data_dict = [];

function _set_addr(_path){
    _addr_json = _path;
}

async function _skatlaz_remote(){
    if (_addr_json === 'false' || _addr_json === '') {
        console.error("No address set. Use _set_addr() first.");
        return null;
    }
    
    try {
        // Suporte para dados inline (objeto JavaScript)
        if (typeof _addr_json === 'object') {
            _data_json = _addr_json;
            console.log("Inline data loaded:", _data_json);
            return _data_json;
        }
        
        // Suporte para arquivo local via File API
        if (_addr_json.startsWith('file://')) {
            console.warn("File protocol not supported due to CORS. Use a local server.");
            return null;
        }
        
        const response = await fetch(_addr_json);
        if(response.ok){
            _data_json = await response.json();
            console.log("Remote data loaded:", _data_json);
            return _data_json;
        } else {
            console.error("Failed to load data:", response.status);
            return null;
        }
    } catch(error) {
        console.error("Fetch error:", error.message);
        return null;
    }
}

function bind(dom_obj){
    if (!_data_json || _data_json === 'false') {
        console.error("No data loaded. Call _skatlaz_remote() first.");
        return;
    }
    
    const container = typeof dom_obj === 'string' 
        ? document.querySelector(dom_obj) 
        : dom_obj;
    
    if (!container) {
        console.error("Container not found");
        return;
    }
    
    _data_dict = [];
    
    // Converte objeto em array de campos/valores
    for (let key in _data_json) {
        if (_data_json.hasOwnProperty(key)) {
            _data_dict.push({field: key, val: _data_json[key]});
        }
    }
    
    // Processa placeholders no container e seus filhos
    function processElement(element) {
        if (element.nodeType === Node.TEXT_NODE) {
            let content = element.textContent;
            let modified = false;
            
            _data_dict.forEach(obj_x => {
                const placeholder = '{' + obj_x.field + '}';
                if (content.includes(placeholder)) {
                    content = content.split(placeholder).join(obj_x.val);
                    modified = true;
                }
            });
            
            if (modified) {
                element.textContent = content;
            }
        } else if (element.nodeType === Node.ELEMENT_NODE) {
            // Processa atributos
            Array.from(element.attributes).forEach(attr => {
                let modified = false;
                let value = attr.value;
                
                _data_dict.forEach(obj_x => {
                    const placeholder = '{' + obj_x.field + '}';
                    if (value.includes(placeholder)) {
                        value = value.split(placeholder).join(obj_x.val);
                        modified = true;
                    }
                });
                
                if (modified) {
                    element.setAttribute(attr.name, value);
                }
            });
            
            // Processa filhos recursivamente
            Array.from(element.childNodes).forEach(child => {
                processElement(child);
            });
        }
    }
    
    // Começa o processamento
    processElement(container);
}
