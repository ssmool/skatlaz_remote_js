var _addr_json = 'false';
var _data_json = 'false';
var _data_dict = [];

function _set_addr(_path){
    _addr_json = _path;
}

async function _skatlaz_remote(){
    try {
        const response = await fetch(_addr_json);
        if(response.ok){
            _data_json = await response.json();
            console.log(_data_json);
            return _data_json;
        }
        return null;
    } catch(error) {
        console.error(error);
        return null;
    }
}

function bind(dom_obj){
    if (!_data_json || _data_json === 'false') {
        console.error("No data loaded. Call _skatlaz_remote() first.");
        return;
    }
    
    const container = dom_obj;
    _data_dict = [];
    
    // Converte objeto em array de campos/valores
    for (let key in _data_json) {
        if (_data_json.hasOwnProperty(key)) {
            _data_dict.push({field: key, val: _data_json[key]});
        }
    }
    
    // Processa cada elemento do container que tenha placeholders
    const elements = container.querySelectorAll('*');
    elements.forEach(el => {
        let originalHtml = el.innerHTML;
        let modifiedHtml = originalHtml;
        
        _data_dict.forEach(obj_x => {
            const placeholder = '{' + obj_x.field + '}';
            const regex = new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g');
            modifiedHtml = modifiedHtml.replace(regex, obj_x.val);
        });
        
        if (modifiedHtml !== originalHtml) {
            el.innerHTML = modifiedHtml;
        }
    });
}
