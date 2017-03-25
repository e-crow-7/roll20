var HTML = HTML ? HTML : {};

(function() {
    
    /***************************************************************************
     * STYLES
     **************************************************************************/
    HTML.style_button = {
        'border'         : '2px solid #C22',
        'color'          : '#C22',
        'display'        : 'inline-block',
        'outline'        : '0',
        'padding'        : '6px 16px',
        'vertical-align' : 'middle',
        'overflow'       : 'hidden',
        'text-decoration': 'none',
        'text-align'     : 'center',
        'cursor'         : 'pointer',
        'white-space'    : 'nowrap',
        'margin'         : '0px'
    }
    
    HTML.style_header = {
        'border-top'     : '1px solid #222',
        'border-left'    : '1px solid #222',
        'border-right'   : '1px solid #222',
        'color'          : '#222',
        'padding'        : '6px',
        'margin'         : '0px !important',
        'position'       : 'relative',
        'top'            : '10px;'
    }
    
    HTML.style_category = {
        'border'         : '1px dashed #222',
        'padding'        : '16px 16px 6px 16px',
        'margin'         : '0px'
    }
    /**************************************************************************/
    
    HTML.ArrowDirection = {
        N  : 0,
        E  : 1,
        W  : 2,
        S  : 3,
        NW : 4,
        NE : 5,
        SE : 6,
        SW : 7
    }
    
    HTML.element = function(tag, attr, style) {
        this.tag     = tag   ? tag   : 'div';
        this.attr    = attr  ? attr  : {};
        this.style   = style ? style : {};
        this.content = '';
        
        this.generate = function() {
            var html = '<';
            html += tag;
            
            for(var a in this.attr) {
                html += ' ' + a + '=' + '"' + this.attr[a] + '"';
            }
            
            html += ' style="';
            for(var s in this.style) {
                html += s + ':' + this.style[s] + ';';
            }
            html += '"';
            
            if(_.contains(['hr', 'br'], this.tag)) { 
                html += '/>';
            } else {
                html += '>' + this.content + '</' + tag + '>';
            }
            
            return html;
        }
    }
    
    HTML.createButton = function(text, link) {
        var link   = new HTML.element('a', {'href': link}, null);
        var button = new HTML.element('div', null, HTML.style_button);
        
        button.content = text;
        link.content   = button.generate();
        
        return link.generate();
    }
    
    HTML.createCategory = function(title, content) {
        var header = new HTML.element('div', null, HTML.style_header);
        var category = new HTML.element('div', null, HTML.style_category);
        header.content = title;
        category.content = content;
        return header.generate() + category.generate();
    }
    
    HTML.createTitle = function(text) {
        var html = '<div>';
        html += '<h1>' + text + '</h1>';
        html += '</div>';
        
        return html;
    }
    
    
    HTML.createTable = function(elements) {
        var html_table = '<table style="border: none; width: 120px; height: 120px">';
        
        for(row in elements) {
            html_table += '<tr>';
            for(cell in elements[row]) {
                html_table += '<td style="border: none; text-align: center;">' + elements[row][cell] + '</td>';
            }
            html_table += '</tr>';
        }
        
        html_table += '</table>';
        
        return html_table;
    }
    
    HTML.createArrow = function(size, direction, color) {
        var arrow_color = color ? color : '#333'; 
        var size_half  = Math.floor( (size / 2) + 0.5 );
        var size_full = size_half * 2;
        var html_borders = '';
        
        switch(direction) {
            case HTML.ArrowDirection.N:
            html_borders = 
                'border-left: ' + size_half + 'px solid transparent;' +
                'border-right: ' + size_half + 'px solid transparent;' +
                'border-bottom: ' + size_full + 'px solid ' + arrow_color + ';';
            break;
            case HTML.ArrowDirection.E:
                html_borders = 
                'border-top: ' + size_half + 'px solid transparent;' +
                'border-bottom: ' + size_half + 'px solid transparent;' +
                'border-left: ' + size_full + 'px solid ' + arrow_color + ';';
            break;
            case HTML.ArrowDirection.S:
                html_borders = 
                'border-left: ' + size_half + 'px solid transparent;' +
                'border-right: ' + size_half + 'px solid transparent;' +
                'border-top: ' + size_full + 'px solid ' + arrow_color + ';';
                break;
            case HTML.ArrowDirection.W:
                html_borders = 
                'border-top: ' + size_half + 'px solid transparent;' +
                'border-bottom: ' + size_half + 'px solid transparent;' +
                'border-right: ' + size_full + 'px solid ' + arrow_color + ';';
                break;
            case HTML.ArrowDirection.NW:
                html_borders = 
                'border-top: ' + size_full + 'px solid ' + arrow_color + ';' +
                'border-right: ' + size_full + 'px solid transparent;';
                break;
            case HTML.ArrowDirection.NE:
                html_borders = 
                'border-top: ' + size_full + 'px solid ' + arrow_color + ';' +
                'border-left: ' + size_full + 'px solid transparent;';
                break;
            case HTML.ArrowDirection.SE:
                html_borders = 
                'border-bottom: ' + size_full + 'px solid ' + arrow_color + ';' +
                'border-left: ' + size_full + 'px solid transparent;';
                break;
            case HTML.ArrowDirection.SW:
                html_borders = 
                'border-bottom: ' + size_full + 'px solid ' + arrow_color + ';' +
                'border-right: ' + size_full + 'px solid transparent;';
                break;
        }
    
        var html_arrow = 
        '<div style="' +
        'display: inline-block;' +
        'width: 0;' +
        'height: 0;' +
        html_borders +
        '"></div>';
        
        return html_arrow;
    }
    
    HTML.createDirectionalControls = function(size) {
        size_arrow = size / 6;
        
        var html_controls =
        /*'<div style="width: ' + size + 'px;">' +
        '<div style="' +
            'width: 100%;' + 
            'text-align: center; font-family: \'Times New Roman\',Times,serif;' +
            'font-size: 20px;' +
        '">' +
        '<strong>Movement</strong>' + 
        '</div>' +*/
        '<div>' +
        HTML.createTable(
            [
                [
                    '<a href="!graphicmove nw">' + HTML.createArrow(size_arrow, HTML.ArrowDirection.NW) + '<a/>',
                    '<a href="!graphicmove n">' + HTML.createArrow(size_arrow, HTML.ArrowDirection.N)  + '<a/>',
                    '<a href="!graphicmove ne">' + HTML.createArrow(size_arrow, HTML.ArrowDirection.NE) + '<a/>',
                ],
                [
                    '<a href="!graphicmove w">' + HTML.createArrow(size_arrow, HTML.ArrowDirection.W)  + '<a/>',
                    '<span></span>',
                    '<a href="!graphicmove e">' + HTML.createArrow(size_arrow, HTML.ArrowDirection.E)  + '<a/>'
                ],
                [
                    '<a href="!graphicmove sw">' + HTML.createArrow(size_arrow, HTML.ArrowDirection.SW) + '<a/>',
                    '<a href="!graphicmove s">' + HTML.createArrow(size_arrow, HTML.ArrowDirection.S)  + '<a/>',
                    '<a href="!graphicmove se">' + HTML.createArrow(size_arrow, HTML.ArrowDirection.SE) + '<a/>'
                ]
            ]
        ) +
        '</div>';
        
        log(html_controls);
        
        return html_controls;
    }

}());