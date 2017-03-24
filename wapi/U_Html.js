var HTML = HTML ? HTML : {};

(function() {
  
    var $ = HTML;
    
    $.ArrowDirection = {
        N  : 0,
        E  : 1,
        W  : 2,
        S  : 3,
        NW : 4,
        NE : 5,
        SE : 6,
        SW : 7
    }
    
    $.createTable = function(elements) {
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
    
    $.createArrow = function(size, direction, color) {
        var arrow_color = color ? color : '#333'; 
        var size_half  = Math.floor( (size / 2) + 0.5 );
        var size_full = size_half * 2;
        var html_borders = '';
        
        switch(direction) {
            case $.ArrowDirection.N:
            html_borders = 
                'border-left: ' + size_half + 'px solid transparent;' +
                'border-right: ' + size_half + 'px solid transparent;' +
                'border-bottom: ' + size_full + 'px solid ' + arrow_color + ';';
            break;
            case $.ArrowDirection.E:
                html_borders = 
                'border-top: ' + size_half + 'px solid transparent;' +
                'border-bottom: ' + size_half + 'px solid transparent;' +
                'border-left: ' + size_full + 'px solid ' + arrow_color + ';';
            break;
            case $.ArrowDirection.S:
                html_borders = 
                'border-left: ' + size_half + 'px solid transparent;' +
                'border-right: ' + size_half + 'px solid transparent;' +
                'border-top: ' + size_full + 'px solid ' + arrow_color + ';';
                break;
            case $.ArrowDirection.W:
                html_borders = 
                'border-top: ' + size_half + 'px solid transparent;' +
                'border-bottom: ' + size_half + 'px solid transparent;' +
                'border-right: ' + size_full + 'px solid ' + arrow_color + ';';
                break;
            case $.ArrowDirection.NW:
                html_borders = 
                'border-top: ' + size_full + 'px solid ' + arrow_color + ';' +
                'border-right: ' + size_full + 'px solid transparent;';
                break;
            case $.ArrowDirection.NE:
                html_borders = 
                'border-top: ' + size_full + 'px solid ' + arrow_color + ';' +
                'border-left: ' + size_full + 'px solid transparent;';
                break;
            case $.ArrowDirection.SE:
                html_borders = 
                'border-bottom: ' + size_full + 'px solid ' + arrow_color + ';' +
                'border-left: ' + size_full + 'px solid transparent;';
                break;
            case $.ArrowDirection.SW:
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
    
    $.createDirectionalControls = function(size) {
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
        $.createTable(
            [
                [
                    '<a href="!graphicmove nw">' + $.createArrow(size_arrow, $.ArrowDirection.NW) + '<a/>',
                    '<a href="!graphicmove n">' + $.createArrow(size_arrow, $.ArrowDirection.N)  + '<a/>',
                    '<a href="!graphicmove ne">' + $.createArrow(size_arrow, $.ArrowDirection.NE) + '<a/>',
                ],
                [
                    '<a href="!graphicmove w">' + $.createArrow(size_arrow, $.ArrowDirection.W)  + '<a/>',
                    '<span></span>',
                    '<a href="!graphicmove e">' + $.createArrow(size_arrow, $.ArrowDirection.E)  + '<a/>'
                ],
                [
                    '<a href="!graphicmove sw">' + $.createArrow(size_arrow, $.ArrowDirection.SW) + '<a/>',
                    '<a href="!graphicmove s">' + $.createArrow(size_arrow, $.ArrowDirection.S)  + '<a/>',
                    '<a href="!graphicmove se">' + $.createArrow(size_arrow, $.ArrowDirection.SE) + '<a/>'
                ]
            ]
        ) +
        '</div>';
        
        return html_controls;
    }

}());