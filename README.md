# PayCertify
These is node code of payment Gatway.

------------------------------------------------------------------------------
How To Use : 

##### Manage Customer : 
Manage Customer using manage customer -> CustomerKey, Vendor Fields

##### Manage StoreCard :
Store the the Card Info with ManageCreditCardInfo -> CcInfoKey,Vendor

##### Manage Contract :
Create Conract with ManageContract 
use the CcInfoKey value in the PaymentInfoKey field.
For ManageContract follow the above process.

-------------------------------------------------------------------------------

##### For API you have to use like follow :
NOTE : Use POST method to call API.

-------------------------------------------------------------------------------
###### Basic information :

API url : http://paymentgate.herokuapp.com/charge

###### POST Data : 

Follow Object format pass in post data.

```sh
{
	TransType:Sale
	NameOnCard:John Doe
	CardNum:4111111111111111
	ExpDate:1233
	CVNum:123
	InvNum:1479277051913
	Zip:29483
	City:Summerville
	State:SC
	Street:Test 1234 Main Street
	Country:US
	shippingZip:
	shippingCity:
	shippingState:
	shippingStreet:
	shippingCountry:
	MagData:
	PNRef:
	Amount:10.00
	TipAmt:0.00
	TaxAmt:0.00
	SureChargeAmt:0.00
	CashBackAmt:0.00
	ExtData:<force>T</force>
	RegisterNum:
	Email:test@email.com
	cartItem:
	paycertifyTransaction:1
}
```
###### Response :
Follow object format in response for every API call.
> {"params":{"TransType":"Sale","NameOnCard":"John Doe","CardNum":"4111111111111111","ExpDate":"1233","CVNum":"123","InvNum":"1479277051913","Zip":"29483","City":"Summerville","State":"SC","Street":"Test 1234 Main Street","Country":"US","shippingZip":"","shippingCity":"","shippingState":"","shippingStreet":"","shippingCountry":"","MagData":"","PNRef":"","Amount":"10.00","TipAmt":"0.00","TaxAmt":"0.00","SureChargeAmt":"0.00","CashBackAmt":"0.00","ExtData":"<force>T</force>","RegisterNum":"","Email":"test@email.com","cartItem":"","paycertifyTransaction":"1","apitoken":"7E35FC46-C951-2D2F-FB42-7795F3D24C60"},"success":1,"error":"","response":{"Result":["0"],"RespMSG":["Approved"],"Message":["APPROVED"],"PNRef":["1c390452-c4ab-e611-a820-00505692354f"],"PaymentType":["VISA"],"TransType":["Sale"],"Amount":["10"],"Account":["411111******1111"],"AuthCode":["4E4DEB"],"payCertifyTransactionId":["582bf9f08c18fd1164829e11"],"ThreeDSecureStatus":["N"],"TransDate":["11162016"],"TransTime":["011720"]}}

------------------------------------------------------------------------------------------------------------------

##### APIs for Request :

###### Manage Customer: 
http://paymentgate.herokuapp.com/ManageCustomer

- O [Optional]
- R [Required]	

```sh	 	
	
	- Parameter
	  - TransType | R | ADD UPDATE DELETE 
	  - Vendor | R | Merchant id 
	  - CustomerID | R | Unique id  of customer 
	  - CustomerKey | R | For delete or update recored 
	  - CustomerName | R | Compnay name 
	  - FirstName | O | First name
	  - LastName | O | Title like Business unit
	  - Department | O | Like Sales 
	  - Street1 | O | Street address 1
	  - Street2 | O | Street address 2
	  - Street3 | O | Street address 3
	  - City | O | City name 
	  - StateID | O | Code of state contain two character
	  - Province | O | Province 
	  - CountryID  | O | Country code
	  - Zip | O | Zip code 
	  - DayPhone | O | Day phone number  
	  - NightPhone  | O | Night phone number
	  - Mobile  | O | Mobile phone number
	  - Fax | O | Fax number 
	  - Email  | O | Valid email address
	  - Status  | O | ACTIVE INACTIVE PENDING CLOSED

	- Response
	  - CustomerKey
	  - Vendor
	  - code
	  - error
	  - Username
```
###### Manage StoreCard :
http://paymentgate.herokuapp.com/StoreCard

- O [Optional]
- R [Required]	

```sh	   
    - Parameter
	  - TransType | R | Contains value ADD UPDATE DELETE
      - Vendor | R | Merchant id
	  - CustomerKey | R | Customer id
	  - CardInfoKey | R | Unique key for update and delele record 
	  - CcAccountNum | O | Valid card number
	  - CcNameOnCard | O | Name on card
	  - CcExpDate | O | Valid expiry date
	  - CcStreet | O | Street address
	  - CCZip | O | zip code
	  - ExtData | O | additional data for future use
	  
	- Response
      - CcInfoKey
	  - Vendor
	  - code
	  - error
	  - Username

```

###### Process StoreCard:
http://paymentgate.herokuapp.com/ProcessStoredCard


- O [Optional]
- R [Required]	

```sh	   
    - Parameter
	  - TransType | R | Contains value ADD UPDATE DELETE
      - TokenMode | R 
	  - CardToken | R 
	  - Amount | O 
	  - Invnum | O 
	  - ExtData | O 
	  
	- Response
      - CcInfoKey
	  - Vendor
	  - code
	  - error
	  - Username

```

###### Manage Contract:
http://paymentgate.herokuapp.com/ManageContract

- O [Optional]
- R [Required]	

```sh	
	- Parameter
	  - TransType | R | Contains value ADD UPDATE DELETE
	  - Vendor | R | Merchant id
	  - CustomerID | R | Unique id  of customer
	  - CustomerKey | For delete or update recored
	  - BillAmt | R | Amount billed format | dd.cccc
	  - PaymentInfoKey | R | Id of payment_method | or add and update
	  - PaymentType | R | Contains value CARD CHECK
	  - StartDate | R | MMDDYYYY || The start date must be greater than today's date.
	  - EndDate | R | MMDDYYYY || Date must be greater than the start date.
	  - BillingPeriod | R | Contains value DAY WEEK MONTH YEAR
	  - BillingInterval | R 
	  - ContractId | O | Contract id
	  - ContractName | O | Name of contract
	  - TaxAmt  | O | Text amount | dd.cccc format
	  - TotalAmt | O | BillAmt + TaxAmt 
	  - MaxFailures  | O | The number of times the system will try to re-process a failed payment 
	  - FailureCount  | O | Count failular
	  - Status  | O | Contains,ACTIVE INACTIVE PENDING CLOSED
	  - EmailMerchant  | O | Send email to merchant 0 = no,1 = true
	  - EmailMerchantFailure | O | Send failular email to merchant 0 = no,1 = true
	  - EmailCustomer | O | Send email to merchant 0 = no,1 = true 
	  - EmailCustomerFailure | O | Send failular email to merchant 0 = no,1 = true
  
    - Response
	  - ContractKey
	  - Vendor
	  - code
	  - error
	  - Username

```
