var filter = require('./filter.js'),
	striptags = require('striptags');

exports.create = function (req, res){
	var params = req.body,
		data = {};
	params['CaptureAction'] = 'ADD';
	data['params'] 	= params;
	data['success']	= 0;
	data['error'] 	= '';
	
	var processors = "CaptureReceipt";

	params['apitoken'] 	= getApiKey;

	if(filter._validateArray(params)){
		var ret = 1;//self::validParams($params);
		if(ret == 1){
			filter._doTrans(params, processors, function(results){
				console.log("response : ", results);
				
				var response = results.Response;
				var responseAry = Object.keys(response);
				responseAry.forEach(function(val,ind){
					response[val] = response[val] ? [response[val][0].replace(/(\r\n|\n|\r)/gm,"")] : response[val];
				});
				
				if(response['LogKey']){
					data['success'] = 1;
				}
				
				data['response'] = response; 

				res.send(data);
			});
		}else{
			data['error'] = ret;
			res.send(data);
		}
	}else{
		data['error'] = 'Array is not valid, You must pass array is argument.';
		res.send(data);
	}
}