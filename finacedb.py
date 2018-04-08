import pyodbc
import pandas as pd
import json
import csv
import pandas
import ast
import datetime
import os
import mysql.connector
import math


connection = 0;
cursor = 0;
sql_Query = ''


def Set_Connection():
    global connection
    global cursor
    connection = mysql.connector.connect(user='root', password='root', host='127.0.0.1', database='Farmer')

    cursor = connection.cursor()





class Farmer():
    FarmerID = 0;
    FarmerName = 0;
    MobileNumber = ''
    
    def __str__(self):
        return (str(self.__dict__))


class ExpenseLabour():
    Id = 0;
    FarmerID = 0;
    Male = 0;
    Female = 0;
    Ploughing = 0;
    Planting = 0;
    Weeding = 0;
    Harvesting = 0;
    
    def __init__(self, ID, FarmerID ,Male, Female, Ploughing, Planting, Weeding, Harvesting):
        self.Id = ID;
        self.FarmerID = FarmerID
        self.Male = Male
        self.Female = Female
        self.Ploughing = Ploughing
        self.Planting = Planting
        self.Weeding = Weeding
        self.Harvesting = Harvesting
    
    def __str__(self):
        return (str(self.__dict__))




class ExpenseMaterial():
    Id = 0;
    FarmerID = 0;
    Fertilizers = 0;
    Seeds = 0;
    Saplings = 0;
    Pesticides = 0;
    
    def __init__(self, ID, FarmerID ,Fertilizers, Seeds, Saplings, Pesticides):
        self.Id = ID;
        self.FarmerID = FarmerID
        self.Fertilizers = Fertilizers
        self.Seeds = Seeds 
        self.Saplings = Saplings
        self.Pesticides = Pesticides 
    
    def __str__(self):
        return (str(self.__dict__))


class ExpenseMachinery():
    Id = 0;
    FarmerID = '';
    Tractor = 0;
    Pump = 0;
    
    def __init__(self, ID ,FarmerID, Tractor, Pump):
        self.Id = ID;
        self.FarmerID = FarmerID
        self.Tractor = Tractor
        self.Pump = Pump  
    
    def __str__(self):
        return (str(self.__dict__))


class IncomeRent():
    Id = 0;
    FarmerID = 0;
    Warehouse = 0;
    Land = 0;
    Tractor = 0;
    Pump = 0;
    Labour = 0;
    
    def __init__(self, ID, FarmerID, Warehouse, Land, Tractor, Pump, Labour):
        self.Id = ID;
        self.FarmerID = FarmerID
        self.Warehouse = Warehouse
        self.Land = Land 
        self.Tractor = Tractor
        self.Pump = Pump
        self.Labour = Labour
    
    def __str__(self):
        return (str(self.__dict__))


class IncomeSell:
    Id = 0;
    FarmerID = 0;
    Type = 0;
    Rate = 0;
    Quantity = 0;
    Amount = 0;
    
    def __init__(self,ID, FarmerID, Type, Rate, Quantity, Amount):
        self.Id = ID;
        self.FarmerID = FarmerID
        self.Type = Type
        self.Rate = Rate 
        self.Quantity = Quantity
        self.Amount = Amount
    
    def __str__(self):
        return (str(self.__dict__))



#############################################



def Run_Insert_Query(sql_Query):
    global cursor
    global connection
    
    Set_Connection();
    cursor.execute(sql_Query);
    connection.commit()
    cursor.close();
    connection.close();



###########################################    API    #########################




def AddExpenseUtility(json_String):
    
    json_Object = json.loads(json_String)
    
    sql_Query = "insert into ExpenseUtility (FarmerID, Water, Electricity)  values (%d,%d,%d); " % (json_Object["FarmerID"],json_Object["Water"],json_Object["Electricity"]);
    Run_Insert_Query(sql_Query);



def AddExpenseMachinery(json_String):
    
    json_Object = json.loads(json_String)
    
    sql_Query = "insert into ExpenseMachinery (FarmerID, Tractor, Pump)  values (%d,%d,%d); " % (json_Object["FarmerID"],json_Object["Tractor"],json_Object["Pump"]);
    Run_Insert_Query(sql_Query);



def AddExpenseLabour(json_String):
    
    json_Object = json.loads(json_String)
    
    sql_Query = "insert into ExpenseLabour (FarmerID, Male, Female, Ploughing, Planting, Weeding, Harvesting)  values (%d,%d,%d,%d,%d,%d,%d); " % (json_Object["FarmerID"],json_Object["Male"],json_Object["Female"],json_Object["Ploughing"],json_Object["Planting"],json_Object["Weeding"],json_Object["Harvesting"]);
    Run_Insert_Query(sql_Query);




def AddExpenseMaterial(json_String):
    print("AddExpenseMaterial.html sucesss")
    
    json_Object = json.loads(json_String)
    
    sql_Query = "insert into ExpenseMaterial (FarmerID ,Fertilizers, Seeds, Saplings, Pesticides)  values (%d,%d,%d,%d,%d); " % (json_Object["FarmerID"],json_Object["Fertilizers"],json_Object["Seeds"],json_Object["Saplings"],json_Object["Pesticides"]);
    Run_Insert_Query(sql_Query);




def AddIncomeRent(json_String):

    json_Object = json.loads(json_String)
    
    sql_Query = "insert into IncomeRent (FarmerID, Warehouse, Land, Tractor, Pump, Labour)  values (%d,%d,%d,%d,%d,%d); " % (json_Object["FarmerID"],json_Object["Warehouse"],json_Object["Land"],json_Object["Tractor"],json_Object["Pump"],json_Object["Labour"]);
    Run_Insert_Query(sql_Query);



def AddIncomeSell(json_String):
    
    json_Object = json.loads(json_String)
    
    sql_Query = "insert into IncomeSell (FarmerID, Type, Rate, Quantity, Amount)  values (%d,%s,%d,%d,%d); " % (json_Object["FarmerID"], str("'" + json_Object["Type"] + "'") ,json_Object["Rate"],json_Object["Quantity"],json_Object["Amount"]);
    Run_Insert_Query(sql_Query);



def AddFinance(json_String):
    
    json_Object = json.loads(json_String)
    Date = "CAST('"+str(json_Object["CurrentDate"]) + "' AS DATETIME)" ;


    if ( ("SubType" not in json_String) or (json_Object["SubType"] is None) or (json_Object["SubType"] == '')):
        SubType = 'NULL'
    else:
        SubType = "'"+json_Object["SubType"]+"'"

    if (  ("JobType" not in json_String) or (json_Object["JobType"] is None) or (json_Object["JobType"] == '')):
        JobType = 'NULL'
    else:
        JobType = "'"+json_Object["JobType"]+"'"
    
    #print (Date)
    
    sql_Query = "insert into Finance (FarmerID, IsExpense, Type, SubType, JobType, Amount, Comment, CurrentDate)  values (%d,%d,%s,%s,%s,%d,%s,%s); " % (int(json_Object["FarmerID"]),int(json_Object["IsExpense"]),"'"+json_Object["Type"]+"'",SubType,JobType,int(json_Object["Amount"]),"'"+json_Object["Comment"]+"'",Date);
    #print (sql_Query)
    Run_Insert_Query(sql_Query);



def RUN_Select_Query(sql_Query):
    global cursor
    global connection
    
    Set_Connection();
    cursor.execute(sql_Query);
    rowData = cursor.fetchall()
    #print (rowData)
    connection.commit()
    cursor.close();
    connection.close();
    return (rowData)

class Finance(object):
    Id = 0;
    FarmerID = 0;
    IsExpense = 0;
    Type = '';
    SubType = '';
    JobType = '';
    Amount = 0.0;
    Comment = '';
    CurrentDate = '';
    
    
    def __init__(self, Id, FarmerID, IsExpense, Type, SubType, JobType, Amount, Comment, CurrentDate):
        
        self.Id = Id;
        self.FarmerID = FarmerID;
        self.IsExpense = IsExpense;
        self.Type = Type;
        self.SubType = SubType;
        self.JobType = JobType;
        self.Amount = Amount;
        self.Comment = Comment;
        self.CurrentDate = CurrentDate;
        
    def __str__(self):
        return (str(self.__dict__))


def GetFinanceData(FarmerID):
    sql_Query = 'select * from Finance where FarmerID = '+ str(FarmerID) +' ;';
#     print (sql_Query)
    finace_Row_data = (RUN_Select_Query(sql_Query));
    
    list_Finance_Data = []

    for row in finace_Row_data:
        Id = row[0]
        FarmerID = row[1] 
        IsExpense = row[2] 
        Type = row[3] 
        SubType = row[4] 
        JobType = row[5] 
        Amount = float(row[6])
        Comment = row[7] 
    #     print (type(row[8]))
        CurrentDate = str(row[8])
    #     CurrentDate = row[8]
    #     print (CurrentDate)

        finance_Object = Finance(Id, FarmerID, IsExpense, Type, SubType, JobType, Amount, Comment, CurrentDate);
    #     print (finance_Object )

        list_Finance_Data.append(finance_Object)
    
    return (json.dumps(list_Finance_Data, default=lambda o: o.__dict__))






class Notification(object):
    ID = 0   
    FarmerID = 0   
    Farmer_Mobile_Number = 0
    
    Resource_Type = 0
    Sub_Resource_Type = ''
    Job_Type = ''
    No_Of_Resources = 0
    
    Latitude = 0
    Longitude = 0
    
    Start_Date = 0
    End_Date = 0
    
    Published_Date = 0
    
    def __init__(self, ID, farmerID ,farmer_Mobile_Number, resource_Type, sub_resource_Type, job_Type, no_Of_Resources, latitude, longitude ,start_Date, end_Date, published_Date):
        self.ID = ID
        
        self.FarmerID = farmerID
        self.Farmer_Mobile_Number = farmer_Mobile_Number
        
        self.Resource_Type = resource_Type 
        self.No_Of_Resources = no_Of_Resources
        self.Sub_Resource_Type = sub_resource_Type
        self.Job_Type = job_Type
        
        self.Latitude = latitude
        self.Longitude = longitude
        
        self.Start_Date = start_Date
        self.End_Date = end_Date
        
        self.Published_Date = published_Date
    
    def __str__(self):
        return (str(self.__dict__))




def Create_Notification_Object(list_Notification_Object):
    ID  = list_Notification_Object[0]
    farmerID = list_Notification_Object[1]
    farmer_Mobile_Number = list_Notification_Object[2]
    resource_Type = list_Notification_Object[3]
    sub_resource_Type = list_Notification_Object[4]
    job_Type = list_Notification_Object[5]
    no_Of_Resources = list_Notification_Object[6]
    latitude = list_Notification_Object[7]
    longitude = list_Notification_Object[8]
    
    start_Date = list_Notification_Object[9]
    end_Date = list_Notification_Object[10]
    published_Date = list_Notification_Object[11]
    
    new_Notification_object = Notification(ID, farmerID ,farmer_Mobile_Number, resource_Type, sub_resource_Type, job_Type, no_Of_Resources, latitude, longitude, start_Date, end_Date, published_Date)
    
    return new_Notification_object





def AddNotification(json_String):
    
    json_Object = json.loads(json_String)
    
    ID = (json_Object["ID"]);
    
    farmerID = (json_Object["FarmerID"]);
    
    if ( ("Farmer_Mobile_Number" not in json_String) or (str(json_Object["Farmer_Mobile_Number"]) == '')):
        farmer_Mobile_Number = 'NULL';
    else:
        farmer_Mobile_Number = "'"+str(json_Object["Farmer_Mobile_Number"]) + "'";
        
   
    resource_Type = "'"+(json_Object["Resource_Type"])+"'";
    
    if ( ("Sub_Resource_Type" not in json_String) or (str(json_Object["Sub_Resource_Type"]) == '')):
        sub_Resource_Type = 'NULL';
    else:
        sub_Resource_Type = "'"+(json_Object["Sub_Resource_Type"])+"'";

    if ( ("Job_Type" not in json_String) or (str(json_Object["Job_Type"]) == '')):
        job_Type = 'NULL';
    else:
        job_Type = "'"+(json_Object["Job_Type"])+"'";
    

    
    if ( ("No_Of_Resources" not in json_String) or (str(json_Object["No_Of_Resources"]) == '')):
        no_Of_Resources = 'NULL';
    else:
        no_Of_Resources = (json_Object["No_Of_Resources"]);
        
        
        
    if ( ("Latitude" not in json_String) or (str(json_Object["Latitude"]) == '')):
        latitude = 'NULL';
    else:
        latitude = float(json_Object["Latitude"]);
        
    if ( ("Longitude" not in json_String) or (str(json_Object["Longitude"]) == '')):
        longitude = 'NULL';
    else:
        longitude = float(json_Object["Longitude"]);
    
#     print(type(json_Object["Start_Date"]))
    
    if ( ("Start_Date" not in json_String) or (str(json_Object["Start_Date"]) == '')):
        start_Date = 'NULL';
    else:
        start_Date = "CAST('"+str(json_Object["Start_Date"]) + "' AS DATETIME)" ;
                       
    if (str(json_Object["End_Date"]) == ''):
        end_Date = 'NULL';
    else:
        end_Date = "CAST('"+str(json_Object["End_Date"]) + "' AS DATETIME)" ;

    if (str(json_Object["Published_Date"]) == ''):
        published_Date = 'NULL';
    else:
        published_Date = "CAST('"+str(json_Object["Published_Date"]) + "' AS DATETIME)" ;
    
#     print ((farmerID ,farmer_Mobile_Number, resource_Type, no_Of_Resources, latitude, longitude, start_Date, end_Date, published_Date))
    
    sql_Query = "insert into Notification (farmerID ,farmer_Mobile_Number, resource_Type, sub_Resource_Type, job_Type, no_Of_Resources, latitude, longitude, start_Date, end_Date, published_Date) values (%d,%s,%s,%s,%s,%d,%d,%d,%s,%s,%s);" %  (farmerID ,farmer_Mobile_Number, resource_Type, sub_Resource_Type, job_Type, no_Of_Resources, latitude, longitude, start_Date, end_Date, published_Date);
    
#     print (sql_Query)
    Run_Insert_Query(sql_Query);





def Create_Notification_Object(list_Notification_Object):
    ID  = list_Notification_Object[0]
    farmerID = list_Notification_Object[1]
    farmer_Mobile_Number = list_Notification_Object[2]
    resource_Type = list_Notification_Object[3]
    sub_resource_Type = list_Notification_Object[4]
    job_Type = list_Notification_Object[5]
    no_Of_Resources = list_Notification_Object[6]
    latitude = float(list_Notification_Object[7])
    longitude = float(list_Notification_Object[8])
    
    start_Date = str(list_Notification_Object[9])
    end_Date = str(list_Notification_Object[10])
    published_Date = str(list_Notification_Object[11])
    
    new_Notification_object = Notification(ID, farmerID ,farmer_Mobile_Number, resource_Type, sub_resource_Type, job_Type, no_Of_Resources, latitude, longitude, start_Date, end_Date, published_Date)
    
    return new_Notification_object



def GetNotificationData(FarmerID):
    sql_Query = 'select * from Notification where FarmerID != '+ str(FarmerID) +' ;';
#     print (sql_Query)
    notification_Row_data = (RUN_Select_Query(sql_Query));
    
    list_Notification_Data = []
    
    Create_Notification_Object
    
    for row in notification_Row_data:
        #print (row)
        list_Notification_Data.append(Create_Notification_Object(row));
    
#     print (json.dumps(list_Notification_Data, default=lambda o: o.__dict__))
    
    return (json.dumps(list_Notification_Data, default=lambda o: o.__dict__))






class Insights(object):
    Farmer_Labour_Average = 0   
    Farmer_Material_Average = 0   
    Farmer_Utilities_Average = 0
    
    Labour_Average = 0
    Material_Average = 0
    Utilities_Average = 0

    
    def __init__(self, Farmer_Labour_Average,  Farmer_Material_Average,  Farmer_Utilities_Average, Labour_Average, Material_Average, Utilities_Average):
        
        self.Farmer_Labour_Average = Farmer_Labour_Average
        self.Farmer_Material_Average = Farmer_Material_Average
        self.Farmer_Utilities_Average = Farmer_Utilities_Average
        
        self.Labour_Average = Labour_Average 
        self.Material_Average = Material_Average
        self.Utilities_Average = Utilities_Average
    
    def __str__(self):
        return (str(self.__dict__))


def CraeteInsightsObject(Notification_Object):
    
    if (Notification_Object[0] is None):
        Farmer_Labour_Average = 0
    else:
        Farmer_Labour_Average =  float(Notification_Object[0])

    #print(Farmer_Labour_Average)
        
    #print (Notification_Object[1])
    if (Notification_Object[1] is None):
        Farmer_Material_Average = 0
    else:
        Farmer_Material_Average =  float(Notification_Object[1] )
        
    if (Notification_Object[2] is None):
        Farmer_Utilities_Average = 0
    else:
        Farmer_Utilities_Average =  float(Notification_Object[2])
        
    if (Notification_Object[3] is None):
        Labour_Average = 0
    else:
        Labour_Average =  float(Notification_Object[3] )

    #print(Farmer_Labour_Average)
    
    if (Notification_Object[4] is None):
        Material_Average = 0
    else:
        Material_Average =  float(Notification_Object[4])
        
    if (Notification_Object[5] is None):
        Utilities_Average = 0
    else:
        Utilities_Average =  float(Notification_Object[5])
    
        
    new_Insights_Object = Insights(Farmer_Labour_Average,  Farmer_Material_Average,  Farmer_Utilities_Average, Labour_Average, Material_Average, Utilities_Average)

    #print (new_Insights_Object)
    
    return new_Insights_Object




def GetFarmerInsights(FarmerID):
    
    sql_Query='''
    select 
            (select AVG(Amount) from Finance where FarmerID = '''+ str(FarmerID) +''' and Type = 'Labour' and IsExpense = 1 ) as 'Farmer_Labour_Average', 
            (select AVG(Amount) from Finance where FarmerID = '''+ str(FarmerID) +''' and Type = 'Material' and IsExpense = 1 ) as 'Farmer_Material_Average',
            (select AVG(Amount) from Finance where FarmerID = '''+ str(FarmerID) +''' and Type = 'Utilities' and IsExpense = 1 ) as 'Farmer_Utilities_Average',
            (select AVG(Amount) from Finance where Type = 'Labour' and IsExpense = 1 ) as 'Labour_Average',
            (select AVG(Amount) from Finance where Type = 'Material' and IsExpense = 1 ) as 'Material_Average',
            (select AVG(Amount) from Finance where Type = 'Utilities' and IsExpense = 1 ) as 'Utilities_Average';
          '''
    #print (sql_Query)
    
    insights_Row_data = (RUN_Select_Query(sql_Query));
    #print (insights_Row_data)
    list_Insights_Data = []
    
    for row in insights_Row_data:
#         print (row)
        list_Insights_Data.append(CraeteInsightsObject(row));
    
#     print (json.dumps(list_Notification_Data, default=lambda o: o.__dict__))
    
    return (json.dumps(list_Insights_Data, default=lambda o: o.__dict__))
  





    
