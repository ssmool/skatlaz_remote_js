var _addr_json = 'false';
var _data_json = 'false';
var _data_dict = [];

function _set_addr(_path){
    _addr_json = _path;
}

function _skatlaz_remote(){
    _r = 'false'
    fetch(_addr_json)
        .then(response => response.json())
        .then(_r = data => console.log(data))
        .catch(_r = error => console.error('Error fetching data:', error));
    _r = response;
    window.alert(response);
    return _r
}

function bind(dom_obj){
        window.alert(dom_obj);
        const container = dom_obj;
        _mvap = [];
        let _data = Object.keys(_data_json);
        _data.forEach(_item => {
            _vmv_tx0 = _item.name;
            _vmv_tx1 = _item.value;
            _vmv = {"field":_vmv_tx0,"val":_vmv_tx1};
            _data_dict.push(_vmv);
        });
        let _dom = Object.keys(dom_obj);
        window.alert(_dom);
        _dom.forEach(ddx => {
            c = 0;
            if(ddx.TextContent.indexof('{' + _data_dict[c].field + '}')){
                _ix = ddx.TextContent.indexof('{' + _data_dict[c].field + '}');
                _ixfl = '{' + mvap[c].field + '}';
                _ixl = _ixfl.length;
                _six = ddx.TextContent.substring(_ix,_ixl);
                _mv_0r = _six.replace(_six, _data_dict[c].val).replace('{','').replace('}','');
                ddomx = dxx.replace(_six,_mv_0r);
                container.appendChild(ddomx);
                window.alert(ddomx);
            }
            ++c;
        });
}
