var filter = require('./filter.js');

exports.create = function (req, res){

	var params = req.body,
		data = {};

	params['apitoken'] 	= getApiKey;
	
	if(params['RegisterNum'] && params['RegisterNum'] == 56) {
		$params['ReturnTransfer'] = true;
	}
	
	var processors = "ProcessCreditCard",
		transType = ['Sale','Auth','Return','Force','Capture','Void','Reversal','Refund','Repeat'];
	
	data['params'] 	= params;
	data['success'] = 0;
	data['error'] 	= '';
	
	if(filter._validateArray(params)){
		var ret = validParams(params);
		ret = ret ? ret : true;
		// console.log("retretret : ",ret);
		if(ret){
			filter._doTrans(params, processors, function(results){
				var response = results.Response;
				var responseAry = Object.keys(response);
				responseAry.forEach(function(val,ind){
					response[val] = response[val] ? [response[val][0].replace(/(\r\n|\n|\r)/gm,"")] : response[val];
				});
				console.log("response1 : ", response);
				data['response'] = response; 
				
				if(response['Result']){
					data['success'] = 1;
				}
				res.send(data);
			});
		}else{
			data['error'] = ret;
			res.send(data);
		}
	}else{
		data['error']['invalid_argument'] = 'Array is not valid, You must pass array is argument.';
		res.send(data);
	}
	function validParams(param){
		var TransType = param['TransType'];
		console.log("TransType", TransType)
		var is_valid = [];
		if(TransType && transType.indexOf(TransType) != -1) {
			// is_valid = 1;
			if(TransType == 'Sale' || TransType == 'Auth' ) {
				is_valid = filter.is_valid(param, {
					'TransType' : 'required|max_len,256',
					'NameOnCard' : 'required|max_len,256',
					'ExpDate' : 'required|max_len,4',
					'CardNum' : 'required|max_len,16',
					'CVNum' : 'required|max_len,4',
					'InvNum' : 'required',
					'Zip' : 'required',
					'City' : 'required',
					'State' : 'required',
					'Street' : 'required',
					'Amount' : 'required',
					'SureChargeAmt' : 'required',
					'CashBackAmt' : 'required',
					'ExtData' : 'required',
					'RegisterNum' : 'required|max_len,4',
				});
			}else if(TransType == 'Force' || TransType == 'Repeat' || TransType == 'Void') {
				is_valid = filter.is_valid(param, {
					'PNRef' : 'required',
				});
			}else if(TransType == 'Return') {
				is_valid = filter.is_valid(param, {
					'PNRef' : 'required',
					'Amount' : 'required',
				}
				);		
			}
			console.log("is_valid", is_valid);
			if(param['RegisterNum'] && param['RegisterNum'] == 56) {
				is_valid = true;
			}
			return is_valid;
		}
	}
}
