addr_stream = 'false';

function _set_data(_data){
    _addr_stream = _data;
}

function streamCSV() {
        csvString = _addr_stream
        if (!csvString) return [];
        const lines = csvString.trim().split('\n');
        if (lines.length === 0) return [];
        const headers = lines[0].split(',').map(header => header.trim());
        const result = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length !== headers.length) continue;
            const item = {};
            for (let j = 0; j < headers.length; j++) {
                // Assign value, trimming whitespace
                item[headers[j]] = values[j].trim();
            }
            result.push(item);
        }
        return result;
}

function streamTXT() {
        txtString = _addr_stream
        if (!txtString) return [];
        return txtString.split('\n')
                       .map(line => line.trim())
                       .filter(line => line.length > 0);
}

function streamXML() {
        xmlString = _addr_stream
        if (!xmlString) return {};
        if (typeof DOMParser === 'undefined') {
            return { error: "DOMParser not found. This function requires a browser environment or Node.js with a DOM implementation." };
        }
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");
        const errorNode = xmlDoc.querySelector('parsererror');
        if (errorNode) {
            return { error: "Failed to parse XML string.", details: errorNode.textContent };
        }
        const jsonResult = {};
        const rootElement = xmlDoc.documentElement;
        if (!rootElement) return { error: "XML document is empty." };
        jsonResult[rootElement.nodeName] = Array.from(rootElement.children).map(child => {
            const nodeData = {};
            Array.from(child.children).forEach(grandchild => {
                nodeData[grandchild.nodeName] = grandchild.textContent;
            });
            return nodeData;
        });
        return jsonResult;
}

function streamRSS() {
        rssString = _addr_stream
        if (!rssString) return [];
        if (typeof DOMParser === 'undefined') {
            return { error: "DOMParser not found. This function requires a browser environment or Node.js with a DOM implementation." };
        }
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(rssString, "text/xml");
        const errorNode = xmlDoc.querySelector('parsererror');
        if (errorNode) {
            return { error: "Failed to parse RSS string.", details: errorNode.textContent };
        }
        const items = xmlDoc.querySelectorAll('item');
        const feedItems = [];
        items.forEach(item => {
            const feedItem = {};
            ['title', 'link', 'description', 'pubDate', 'author'].forEach(tag => {
                const node = item.querySelector(tag);
                if (node) {
                    feedItem[tag] = node.textContent;
                }
            });
            feedItems.push(feedItem);
        });
        return feedItems;
    }
}
