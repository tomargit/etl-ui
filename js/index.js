$(document).ready(function(){

	siteUrl = "";
	dbData = [];
	sourceData = [];
	verticalDashDiv = '<div class="vertical-dot-line"></div>';
	horizontalDashDiv = '<div class="horizontal-dot-line"></div>';
	dashDiv = '<div>' + verticalDashDiv + '' + horizontalDashDiv + '</div>';
	link = 'http://10.11.244.78:8080/ETLTool/';

	// manage height of left and right panel
	var mainHeight=$('#main').height(), navHeight = $('#main nav').height(), leftHeight = $('#left').height(),
	total = $(document).height() - mainHeight + leftHeight;
	$("#left, #right").height(total);

	// On page load change fa icon css
	faIconWidth = $('#repositories i').width();
	faIconHeight = $('#repositories i').height();
	manageDotStructure($('.left-sidebar-content'));

	$("#topNav li").click(function(){
		var $this = $(this);
		$('#topNav li').removeClass('active');
		$this.addClass('active');
	});

	$("#modalSubmit").click(function(){
		/*ajaxParam = {};
		ajaxParam["url"] = "https://www.w3schools.com/bootstrap4/checkDBConnectionStatus";
		ajaxParam["method"] = "POST";
		ajaxParam["dbType"] = $('#dbType').val();
		ajaxParam["dbUrl"] = $('#dbUrl').val();
		ajaxParam["successCallback"] = "dbSuccessCallback";
		ajaxParam["completeCallback"] = "dbCompleteCallback";
		ajaxParam["errorCallback"] = "dbErrorCallback";
		makeAjaxCall(ajaxParam);*/
		//$('#myModal').modal('hide');
		sourceData = [{"tableName":"Table 0","status":true},{"tableName":"Table 1","status":true},{"tableName":"Table 2","status":true},{"tableName":"Table 3","status":true},{"tableName":"Table 4","status":true},{"tableName":"Table 5","status":true},{"tableName":"Table 6","status":true},{"tableName":"Table 7","status":true},{"tableName":"Table 8","status":true},{"tableName":"Table 9","status":true}];
		sourceDataSuccess(sourceData);
	});

	$("#newDB").click(function(){
		$('#myModal').modal('show');
		ajaxParam = {};
		//ajaxParam["url"] = "https://www.w3schools.com/bootstrap4/checkDBConnectionStatus";
		ajaxParam["url"] = link + "getAllDBTypes";
		ajaxParam["method"] = "GET";
		ajaxParam["dbType"] = $('#dbType').val();
		ajaxParam["dbUrl"] = $('#dbUrl').val();
		ajaxParam["successCallback"] = "dbSuccessCallback";
		ajaxParam["completeCallback"] = "dbCompleteCallback";
		ajaxParam["errorCallback"] = "dbErrorCallback";
		//makeAjaxCall(ajaxParam);  
		dbData = [{"passRequired":false,"dbType":"Hbase","status":true,"userNameRequired":false,"urlRequired":true},{"passRequired":true,"dbType":"MySql","status":true,"userNameRequired":true,"urlRequired":true}];
		dbSuccessCallback(dbData);
		$('#myModal').modal('show');

	});

	$('#myModal').on('hide.bs.modal', function (e) {
		$('#modalContent').html('');
		$('#moreContent').html('');
		$('.modal-content').removeAttr('style');
	});

	$(document).on("change", "#dbType" , function() {
		var $this = $(this);
		$('#modalContent input:text').closest('.modal-section').remove();
		$.each(dbData, function(iO,vO){
				if($this.val() == vO.dbType)
				{
					$.each(vO, function( index, value ) {
						if((index == 'passRequired' || index == 'userNameRequired' || index == 'urlRequired') && value)
						{
							var label = index, newLabel=label[0].toUpperCase();
							label = label.replace('Required','');
							for(var i=1; i<label.length; i++){
								if(label[i] == label[i].toUpperCase())
									newLabel += ' '+label[i];
								else
									newLabel += label[i];
							}
							$('#modalContent').append('<div class="modal-section"><label>'+newLabel+':</label> <input type="text" id="'+value+'" name="'+value+'"/></div>');
						}
					});
				}
		});
	});

	$(document).on("click", ".modal-text a", function(){
		var $this = $(this);
		if($this.hasClass('table-select-not'))
		{
			$this.removeClass('table-select-not');
			$this.addClass('table-select');
			$this.css('color', 'blue');
		} else if($this.hasClass('table-select'))
		{
			$this.removeClass('table-select');
			$this.addClass('table-select-not');
			$this.css('color', 'black');
		}
	});

	$(document).on("click", "#selectTable", function(){
		var $this = $(this);


		html = '';
		$('#moreContent a.table-select').each(function(i,ref){
			var $ref = $(ref), tableName = $ref.html();

			html += '<div class="left-pan-subsection">'
						+ '<div class="vertical-dot-line"></div>'
						+ '<div class="horizontal-dot-line"></div>'
						+ '<div id="source" class="left-pan-collapse">'
						+		'<i class="fa fa-plus-square-o hand" aria-hidden="true"></i> &nbsp;' + tableName
						+	'</div>'
						+'</div>';
		});
		$('#source').closest('.left-pan-subsection').append(html);
		manageDotStructure($('#source').closest('.left-pan-subsection'));
		$('#myModal').modal('hide');
	});

	$(document).on("click", ".hand", function(){
		var $this = $(this);
		$this.closest('div').parent().find('.left-pan-subsection').slideToggle();
	});
});

function makeAjaxCall(ajaxParam) {

	params = {};
	for (var key in ajaxParam) {
		if (key != 'successCallback' && key != 'errorCallback' && key != 'completeCallback' && key != 'url' && key != 'method') {
			params[key] = ajaxParam[key];
		}
	}
	params = JSON.stringify(params);

	$.ajax(	{
			url: ajaxParam['url'],
			type: ajaxParam['method'],
			data: params,
			dataType: "json",
			crossDomain: true,
			error: function(){
			},
			beforeSend: function(){
			},
			complete: function(){
			},
			success: function(result){
				window[ajaxParam["successCallback"]](result);
			}
	});

  /*$.ajax({
    type: ajaxParam['method'],
    url: ajaxParam['url'],
    //data: params,
    //contentType: "application/json; charset=utf-8",
    dataType: "json",
    crossDomain: true,
    success: function(result){
        ajaxParam["successCallback"](result);
    },
    error : function(){
      //ajaxParam['errorCallback']();
    },
    complete : function(){
      //ajaxParam['dbCompleteCallback']();
    }
  });*/

    /*$.ajax({
        success : ajaxParam["successCallback"],
        error : ajaxParam['errorCallback'],
		    complete : ajaxParam['dbCompleteCallback'],
        data : params,
        url : ajaxParam['url'],
        type : ajaxParam['method'],
        dataType : 'json',
		    crossDomain: true,
    });*/
}
function dbSuccessCallback(data){
		$('#modalContent').html('');
		$('#moreContent').html('');
		if(data && data.length>0)
		{
			var length = data.length;
			$('#modalContent').append('<div class="modal-section"><label>Database Type:</label><select id="dbType"></select></div>');
			for(var i=0; i<length; i++)
			{
				$('#dbType').append('<option>'+data[i].dbType+'</option>');
			}
			$.each(data[0], function( index, value ) {
			if((index == 'passRequired' || index == 'userNameRequired' || index == 'urlRequired') && value)
					$('#modalContent').append('<div class="modal-section"><label>Url:</label> <input type="text" id="'+value+'" name="'+value+'"/></div>');
			});
		}
}
function dbCompleteCallback(){

	$('#modalClose').click();
}
function dbErrorCallback(){
	$('#modalClose').click();
}
function sourceDataSuccess(data){
	$('#moreContent').html('<div id="dbTable" style="display:none;"><div class="modal-text"></div></div>');
	$('.modal-content').height($('.modal-content').height()+$('#dbTable').height());
	$.each(sourceData,function(i,v){
		$('.modal-text').append('<a href="javascript:void(0)" style="color: black;" class="table-select-not" data-id='+i+'>'+v.tableName+'</a><br/>');
	});
	$('#moreContent').append('<div><button type="button" class="btn btn-primary" id="selectTable" style="margin-left: '+ ($('#dbTable').width() + 50) +'px;margin-top: 100px;">Select</button></div>');
	$('#dbTable').show();
}

function manageDotStructure(obj){
	leftMargin = 0;
  if(obj.find('i:first').closest('div').siblings('.vertical-dot-line:first').length)
		leftMargin = Number(obj.find('i:first').closest('div').siblings('.horizontal-dot-line:first').width()) + Number(obj.find('i:first').width()/2);

	$.each(obj.find('.left-pan-subsection'), function(i,v){
		var $this = $(this);

		if(leftMargin)
			$this.css('margin-left', leftMargin);

		if(i==0)
			$this.find('.vertical-dot-line').css('margin-left',faIconWidth/2).css('margin-top','-3px');
		else
			$this.find('.vertical-dot-line').css('margin-left',faIconWidth/2).css('margin-top',-1*(3+faIconHeight/2)+'px');

		$this.find('.horizontal-dot-line').css('margin-left',faIconWidth/2);
		$this.find('.horizontal-dot-line').next().css('margin-left', $('.horizontal-dot-line').width()+8).css('margin-top',-1*faIconWidth);
	});

	// manage nexr verticle height
	if(leftMargin)
	{
		var objCor = obj.find('.horizontal-dot-line:first').position(), nextRef = obj.next(), nectCor = nextRef.position();

	}
}
