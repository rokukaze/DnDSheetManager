function generateRowContent(id,content) {

        var html = "<div class=\"row\""

        if( !(id == null) )
        {
                html += " id=\""+id+"\""
        }

        html += ">";
        html += content;
        html += "</div>";

        return html;
}

function generateColContent(id,colSize,content) {

        var html = "<div class=\"col-xs-"+colSize+"\""

        if( !(id == null) )
        {
                html += " id=\""+id+"\""
        }

        html += ">";
        html += content;
        html += "</div>";

        return html;
}

function generateColWell(colSize,id,label,value,addValue) {

        var html = "<div class=\"col-xs-"+colSize+"\">";

        if( value == null )
        {
                value = "";
        }

        if( addValue )
        {
                html += "<div class=\"well\">";
                html += "<div class=\"well-label\">"+label+"</div>";
		if( id == "character-player" )
		{
			html += "<input class=\"col-xs-12\" type=\"text\" id=\"add-"+id+"\" value=\""+value+"\" readonly>";
		}
		else
		{
			html += "<input class=\"col-xs-12\" type=\"text\" id=\"add-"+id+"\" value=\""+value+"\">";
		}
        }
        else
        {
                html += "<div class=\"well\">";
                html += "<div class=\"well-label\">"+label+"</div>";
                html += "<div class=\"well-value\" id=\"display-"+id+"\">"+value+"</div>";
        }

        html += "</div></div>";

        return html;
}

function generateColWellWithOnClick(colSize,id,label,value,onclick) {

        var html = "<div class=\"col-xs-"+colSize+"\" onclick=\""+onclick+"\">";

        html += "<div class=\"well\" id=\""+id+"\">";
        html += "<div class=\"well-label\">"+label+"</div>";
        html += "<div class=\"well-value\">"+value+"</div>";

        html += "</div></div>";

        return html;
}

function generateGenericHTML() {
	this.rowContent = generateRowContent;
	this.colContent = generateColContent;
	this.colWell = generateColWell;
	this.colWellWithOnClick = generateColWellWithOnClick;
}

var generate = new generateGenericHTML();
