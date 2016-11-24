var Curl = require( 'node-libcurl' ).Curl;
var param = require('node-jquery-param');
var request = require('request');
var parseString = require('xml2js').parseString;


exports._validateArray = function(params){
	var t = true;
    if (params && typeof params != "object") {
		t = false;
    }
	return t; 
}

exports.is_valid = function(params, validateObj){
	var validationKeyAry = Object.keys(validateObj);
	var tempError = [];
	validationKeyAry.forEach(function(val,index){
		var validationValue = validateObj[val].split("|");
		if(validationValue.indexOf("required") != -1){
			if(params[val] && params[val].trim() == ""){
				tempError.push(val+" Fields required");
			}
		}
		if(validationValue[1]){
			var max_length = validationValue[1].split(",");
			if(max_length[0] == "max_len"){
				//console.log("testing ", params[val], params[val].trim(), params[val].trim().length, parseInt(max_length[1]))
				if(params[val] && params[val].trim().length > parseInt(max_length[1])){
					tempError.push(val+" Fields length Mismatch");
				}
			}	
		}
		if(validationKeyAry.length-1 == index){
			console.log("tempError : ",tempError)
			return tempError;
		}
	})
}

exports._doTrans = function(params, processors, callback){
	var url = '',
		baseUrl = apiBase;

	url = baseUrl+'/ws/encgateway2.asmx/'+processors;
	
	if(processors == 'GetCardTrx'){url = baseUrl+'/ws/encgateway.asmx/'+processors;}
	
	if(processors == 'ManageCustomer' || processors == 'CaptureReceipt' || processors == 'ManageContract' || processors == 'ManageCreditCardInfo' || processors == 'ManageCheckInfo' || processors == 'ManageContractAddDaysToNextBillDt' ){url = baseUrl+'/ws/recurring.asmx/'+processors;}
	
	if(processors == 'StoreCard') { url = baseUrl+'ws/cardsafe.asmx/'+processors; }
	
	if(processors == 'ProcessStoredCard') { url = baseUrl+'ws/cardsafe.asmx/'+processors; }
	
	// $req =  urldecode(http_build_query($params));

	var req = decodeURIComponent(param(params));
	
	console.log("req", req);
	console.log("ReturnTransfer", params['ReturnTransfer']);
	
	var _FOLLOWLOCATION = true,
		_RETURNTRANSFER = true;
	if(params['ReturnTransfer']) {
		_FOLLOWLOCATION = true;
		_RETURNTRANSFER = false;
	}
	
	var curl = new Curl();
    curl.setOpt( Curl.option.URL, url );
    curl.setOpt( Curl.option.FOLLOWLOCATION, _FOLLOWLOCATION );
	curl.setOpt( Curl.option.POSTFIELDS, req );
    curl.setOpt( 'SSL_VERIFYHOST', 0 ); //This is not a boolean field! 0 -> Disabled, 2 -> Enabled
	curl.setOpt( 'SSL_VERIFYPEER', 0 );
	 
	curl.on( 'end', function( statusCode, body, headers ) {
	    console.info( statusCode );
	    console.info( '---' );
	    console.info( body.length );
	    console.info( '---' );
	    console.info( this.getInfo( 'TOTAL_TIME' ));
	 	parseString(body, function (err, result) {
		    callback(result);
		});

	 	// return JSON.parse(body);

	 	/*if(processors == 'GetCardTrx') { 
			responce = json_decode($xmlRaw,1); 
		}else {
			$xml = simplexml_load_string ($xmlRaw);
			$responce = json_decode(json_encode ($xml),true);
		}*/
	    this.close();
	});
	 
	curl.on( 'error', curl.close.bind( curl ) );
	curl.perform();
	}
