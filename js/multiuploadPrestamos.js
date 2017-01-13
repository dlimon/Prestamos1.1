/*correcion en version 4.0*/
var arreglo = [];
	var contador = 0 ;
function multiUploader(config){
  
	this.config = config;
	this.items = "";
	//this.all = []
	var self = this;
	
	multiUploader.prototype._init = function(){
		if (window.File && 
			window.FileReader && 
			window.FileList && 
			window.Blob) {		
			 var inputId = $("#"+this.config.form).find("input[type='file']").eq(0).attr("id");
			 document.getElementById(inputId).addEventListener("change", this._read, false);
			 document.getElementById(this.config.dragArea).addEventListener("dragover", function(e){ e.stopPropagation(); e.preventDefault(); }, false);
			 document.getElementById(this.config.dragArea).addEventListener("drop", this._dropFiles, false);
			 document.getElementById(this.config.form).addEventListener("submit", this._submit, false);
		} else
			console.log("Browser supports failed");
	}
	
	multiUploader.prototype._submit = function(e){
		e.stopPropagation(); e.preventDefault();
		self._startUpload();
	}
	
	multiUploader.prototype._preview = function(data){
		this.items = data;
		if(this.items.length > 0){
			var html = "";		
			var uId = "";
		    if(contador == 4){
             alert("numero de archivos permitidos : 4 ");
           }
           else{
 			for(var i = 0; i<this.items.length; i++){
 				if(contador < 4){
 				arreglo[contador]  = this.items[i];
 				contador ++;
 				
				uId = this.items[i].name._unique();
				var sampleIcon = '<img src="images/image.png" />';
				var errorClass = "";
				if(typeof this.items[i] != undefined){
					if(self._validate(this.items[i].type) <= 0) {
						sampleIcon = '<img src="images/unknown.png" />';
						errorClass =" invalid";
					} 
					html = '<div id="pdf'+contador+'" class="dfiles'+errorClass+'" rel="'+uId+'"><h5>'+sampleIcon+this.items[i].name+'<input type="button" onclick="eliminarPDF('+(contador)+');" class="btnEliminar" value="Eliminar"></input></h5><div id="'+uId+'" class="progress" style="display:none;"><img src="images/ajax-loader.gif" /></div></div>';
				}
			
			$("#dragAndDropFiles").append(html);
           }
           
		}
		}
	}
}

	multiUploader.prototype._read = function(evt){
		if(evt.target.files){
			self._preview(evt.target.files);
			self.all.push(evt.target.files);
		} else 
			console.log("Failed file reading");
	}
	
	multiUploader.prototype._validate = function(format){
		var arr = this.config.support.split(",");
		return arr.indexOf(format);
	}
	
	multiUploader.prototype._dropFiles = function(e){
		e.stopPropagation(); e.preventDefault();
		self._preview(e.dataTransfer.files);
		self.all.push(e.dataTransfer.files);
	}
	
	multiUploader.prototype._uploader = function(file,f,matricula){
		if(typeof file != undefined && self._validate(file.type) > 0){
			var data = new FormData();
			var ids = file.name._unique();
			data.append('file',file);
			data.append('index',ids);
			$(".dfiles[rel='"+ids+"']").find(".progress").show();
			$.ajax({
				type:"POST",
				url:this.config.uploadUrl+"?matricula="+matricula,
				data:data,
				cache: false,
				contentType: false,
				processData: false,
				success:function(rponse){
					$("#"+ids).hide();
					var obj = $(".dfiles").get();
					$.each(obj,function(k,fle){
						if($(fle).attr("rel") == rponse){
							$(fle).slideUp("normal", function(){ $(this).remove(); });
						}
					});
					/*if (f+1 < file.length) {
						self._uploader(file,f+1,matricula);
					}*/
				}
			});
		} else
			console.log("Invalid file format - "+file.name);
	}
	
	multiUploader.prototype._startUpload = function(){
		if(this.items.length > 0){
			var numeroArchivo = 0;
			if(arreglo.length == "4"){
			for(var k=0; k<arreglo.length; k++){
				var file = arreglo[k];
				var matricula = document.getElementById("matricula").value;
				matricula = matricula + "_" + k;
				this._uploader(file,0,matricula);
			}
			var archivos = arreglo.length;
			myFunction(archivos);
		}else
		{
			alert("Deve subir los 4 archivos pdf");
			var archivos = this.items.length;
			myFunction(archivos);
		}
		}else{alert("Deve de subir un archivo pdf solicitado");}
	}
	
	String.prototype._unique = function(){
		return this.replace(/[a-zA-Z]/g, function(c){
     	   return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    	});
	}

	this._init();
}

function initMultiUploader(){
	new multiUploader(config);
}