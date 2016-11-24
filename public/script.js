$(document).ready(function() {
	function getParam(value) {
		var returnArray = [];
		switch (value) {
			
			case 'charge' :
				
				returnArray = returnArray.concat(['TransType','NameOnCard', 'CardNum' ,'ExpDate' ,'CVNum' ,'InvNum' ,'Zip' ,'City' ,'State' ,'Street' ,'Country'  ,'shippingZip' ,'shippingCity' ,'shippingState'  ,'shippingStreet' ,'shippingCountry' ,'MagData' ,'PNRef' ,'Amount'  ,'TipAmt' ,'TaxAmt' ,'SureChargeAmt' ,'CashBackAmt','ExtData' ,'RegisterNum' ,'Email' ,'cartItem','paycertifyTransaction']); 
				
			break;
			
			case 'customer' :
			
				returnArray = returnArray.concat(['TransType','Vendor', 'CustomerID' ,'CustomerName' ,'FirstName' ,'CustomerKey' ,'LastName' ,'Title' ,'Department' ,'Street' ,'Street1'  ,'Street2' ,'Street3' ,'City'  ,'StateID' ,'Province' ,'CountryID' ,'Zip' ,'DayPhone'  ,'NightPhone' ,'Mobile' ,'Fax' ,'Email','Status']); 
			
			break;
			
			case 'storecard' :
				
				returnArray = returnArray.concat(['TokenMode','CardNum', 'ExpDate' ,'CustomerKey' ,'NameOnCard' ,'Street' ,'Zip' ,'ExtData']); 
				
			break;
			
			case 'processstoredcard' :
				
				returnArray = returnArray.concat(['TransType','TokenMode','CardToken', 'Amount' ,'InvNum' ,'PNRef' ,'ExtData']); 
				
			break;
			
			case 'contract' :
				
				returnArray = returnArray.concat(['TransType','Vendor','CustomerID', 'CustomerKey' ,'BillAmt' ,'PaymentInfoKey' ,'PaymentType', 'StartDate', 'EndDate', 'BillingPeriod', 'BillingInterval', 'ContractId', 'ContractName', 'TaxAmt', 'TotalAmt', 'MaxFailures', 'FailureCount', 'Status', 'EmailMerchant', 'EmailMerchantFailure', 'EmailCustomer', 'EmailCustomerFailure']); 
				
			break;
			
		}
		return returnArray;
	}
	
	$("form.formsubmit").submit(function(e){
		$(".progress-indicator").show();
		e.preventDefault();
		$('form input#InvNum').val(Date.now());
		var _POST = $(this).serializeObject();
		var Ret = {},
			params = {},
			action = _POST.action;

		var formvar = getParam(action);

		console.log("action : ",action)
		if(action == "charge"){
			Ret.action = action;
			formvar.forEach(function(val, indaaix){
				// console.log(val, indaaix);
				if (_POST[val]) {
					params[val] = _POST[val].trim();
				}else{
					params[val] = '';
				}
			})
			console.log(params);
			$.post( "/charge", params)
				.done(function( data ) {
					$(".progress-indicator").hide();
					var return1 = data;
					Ret['message'] = JSON.stringify(return1, null, 4);
					$('pre#charge').append(Ret['message']);
				});
		} else if(  action == 'customer' ) {
			Ret.action = action;
			
			formvar.forEach(function(val, indaaix){
				// console.log(val, indaaix);
				if (_POST[val]) {
					params[val] = _POST[val].trim();
				}else{
					params[val] = '';
				}
			})
			$.post( "/ManageCustomer", params)
				.done(function( data ) {
					console.log(data)
					$(".progress-indicator").hide();
					var return1 = data;
					Ret['message'] = JSON.stringify(return1, null, 4);
					$('pre#ManageCustomer').append(Ret['message']);
				});
			
		} else if(  action == 'storecard' ) {
			Ret.action = action;
			
			formvar.forEach(function(val, indaaix){
				// console.log(val, indaaix);
				if (_POST[val]) {
					params[val] = _POST[val].trim();
				}else{
					params[val] = '';
				}
			})
			$.post( "/StoreCard", params)
				.done(function( data ) {
					console.log(data)
					$(".progress-indicator").hide();
					var return1 = data;
					Ret['message'] = JSON.stringify(return1, null, 4);
					$('pre#StoreCard').append(Ret['message']);
				});
		} else if(  action == 'processstoredcard' ) {
			Ret.action = action;
			
			formvar.forEach(function(val, indaaix){
				if (_POST[val]) {
					params[val] = _POST[val].trim();
				}else{
					params[val] = '';
				}
			})
			
			$.post( "/ProcessStoredCard", params)
				.done(function( data ) {
					console.log(data)
					$(".progress-indicator").hide();
					var return1 = data;
					Ret['message'] = JSON.stringify(return1, null, 4);
					$('pre#ProcessStoredCard').append(Ret['message']);
				});
			
		} else if(  action == 'contract' ) {
			Ret.action = action;
			
			formvar.forEach(function(val, indaaix){
				if (_POST[val]) {
					params[val] = _POST[val].trim();
				}else{
					params[val] = '';
				}
			})
			
			$.post( "/ManageContract", params)
				.done(function( data ) {
					console.log(data)
					$(".progress-indicator").hide();
					var return1 = data;
					Ret['message'] = JSON.stringify(return1, null, 4);
					$('pre#ManageContract').append(Ret['message']);
				});
			
		}
	})

	$.fn.serializeObject = function(){
	    var o = {};
	    var a = this.serializeArray();
	    $.each(a, function() {
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
	    return o;
	};
})