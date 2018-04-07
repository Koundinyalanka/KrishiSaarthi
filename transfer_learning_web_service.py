import os
import bottle
import finacedb as fp
from bottle import route, request, static_file, run, post
import classify_multi_model_web_service as cmmws
import json
import base64


@route('/js/<filename>')
def server_static(filename):
    return static_file(filename, root='./js/')

@route('/css/<filename>')
def server_static(filename):
    return static_file(filename, root='./css/')

@route('/images/<filename>')
def server_static(filename):
    return static_file(filename, root='./images/')

@route('/lib/css/<filename>')
def server_static(filename):
    return static_file(filename, root='./lib/css/')

@route('/lib/js/<filename>')
def server_static(filename):
    return static_file(filename, root='./lib/js/')

@route('/')
def root():
    bottle.BaseRequest.MEMFILE_MAX = 1024 * 10240
    return static_file('index.html', root='.')

##@route('/addincome.html')
##def do_upload():
##    bottle.BaseRequest.MEMFILE_MAX = 1024 * 10240
##    string_Json_Data = request.json.get('string_Json_Data')
##    return fp.Add_Income_Data(string_Json_Data)
##@route('/getincome.html')
##def do_upload():
##    bottle.BaseRequest.MEMFILE_MAX = 1024 * 10240
##    Farmer_ID = request.json.get('Farmer_ID')
##    return fp.Get_Farmers_Income(Farmer_ID)
##@route('/getexpense.html')
##def do_upload():
##    bottle.BaseRequest.MEMFILE_MAX = 1024 * 10240
##    string_Json_Data = request.json.get('Farmer_ID')
##    return fp.Get_Farmers_Expense(Farmer_ID)
##@route('/addexpense.html')
##def do_upload():
##    bottle.BaseRequest.MEMFILE_MAX = 1024 * 10240
##    string_Json_Data = request.json.get('string_Json_Data')
##    return fp.Add_Expense_Data(string_Json_Data)

@route('/AddExpenseUtility.html', method='POST')
def do_upload():
    bottle.BaseRequest.MEMFILE_MAX = 1024 * 10240
    string_Json_Data = request.json.get('string_Json_Data')
    return fp.AddExpenseUtility(json_String)

@route('/AddExpenseMachinery.html', method='POST')
def do_upload():
    bottle.BaseRequest.MEMFILE_MAX = 1024 * 10240
    string_Json_Data = request.json.get('string_Json_Data')
    return fp.AddExpenseMachinery(json_String)

@route('/AddExpenseLabour.html', method='POST')
def do_upload():
    bottle.BaseRequest.MEMFILE_MAX = 1024 * 10240
    string_Json_Data = request.json.get('string_Json_Data')
    return fp.AddExpenseLabour(json_String)

@post('/addExpenseMaterial')
def addExpenseMaterial():
    print("=======================================HI=====")
    bottle.BaseRequest.MEMFILE_MAX = 1024 * 10240
    string_Json_Data = request.json.get('string_Json_Data')
    print(string_Json_Data)
    fp.AddExpenseMaterial(json.dumps(string_Json_Data))


@route('/addIncomeRent', method='POST')
def do_upload():
    bottle.BaseRequest.MEMFILE_MAX = 1024 * 10240
    string_Json_Data = request.json.get('string_Json_Data')
    return fp.AddIncomeRent(json_String)

@route('/AddIncomeSell.html', method='POST')
def do_upload():
    bottle.BaseRequest.MEMFILE_MAX = 1024 * 10240
    string_Json_Data = request.json.get('string_Json_Data')
    return fp.AddIncomeSell(json_String)

## NEW API AddFinance
@route('/AddFinance', method='POST')
def do_upload():
    bottle.BaseRequest.MEMFILE_MAX = 1024 * 10240
    json_String = request.json.get('string_Json_Data')
    print(json_String)
    return fp.AddFinance(json.dumps(json_String))

@route('/GetFinanceData', method='POST')
def do_upload():
    bottle.BaseRequest.MEMFILE_MAX = 1024 * 10240
    json_String = request.json.get('FarmerID')
    print(json_String)
    return fp.GetFinanceData(json.dumps(json_String))

##AddNotification(json_String)
@route('/AddNotification', method='POST')
def do_upload():
    bottle.BaseRequest.MEMFILE_MAX = 1024 * 10240
    json_String = request.json.get('string_Json_Data')
    print(json_String)
    return fp.AddNotification(json.dumps(json_String))

##def GetNotificationData(FarmerID):
@route('/GetNotificationData', method='POST')
def do_upload():
    bottle.BaseRequest.MEMFILE_MAX = 1024 * 10240
    json_String = request.json.get('FarmerID')
    print(json_String)
    return fp.GetNotificationData((json_String))

##def GetFarmerInsights(FarmerID):
@route('/GetFarmerInsights', method='POST')
def do_upload():
    bottle.BaseRequest.MEMFILE_MAX = 1024 * 10240
    json_String = request.json.get('FarmerID')
    print(json_String)
    return fp.GetFarmerInsights((json_String))





@route('/index.html', method='POST')
def do_upload():
    bottle.BaseRequest.MEMFILE_MAX = 1024 * 10240

    #category = request.forms.get('category')
    #upload = request.files.get('upload')
    category = request.json.get('category')
    upload = request.json.get("upload")
    if upload is None:
        print("upload is NULL")
    if category is None:
        print("upload is NULL")
    #name, ext = os.path.splitext(upload.filename)
    name='temp'
    ext='.jpg'
    print(category)
    
    if ext not in ('.jpg', '.jpeg'):
        return "File extension not allowed."

    save_path = "C:/Users/Administrator/Desktop/Agro/upload/{category}".format(category=category)
    if not os.path.exists(save_path):
        os.makedirs(save_path)

    file_path = "{path}/{file}".format(path=save_path, file=name+ext)
    my_str_as_bytes = str.encode(upload)
##    upload.save(file_path,True)
    print(file_path)
    with open(file_path, "wb") as fh:
        fh.write(base64.decodebytes(my_str_as_bytes))
##    response.headers['Access-Control-Allow-Origin'] = '*'
##    response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
##    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'
    output=cmmws.classify(category,file_path)
    print(output)
    return output #cws.classify(file_path)

if __name__ == '__main__':
    run(host='0.0.0.0', port=3003)

