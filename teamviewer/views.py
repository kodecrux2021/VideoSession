#####################################################
# Purpose: Helper functions to support API scripting examples.
#
# Copyright (c) 2014 TeamViewer GmbH
# Example created 2014-02-20
# Version 1.1
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#
# When reusing or redistributing the software please respect any licenses of
# included software from third parties, if applicable.
#####################################################

##########
# includes
##########

import sys, os
import httplib
import json

##################
# script variables
##################

# version of the TeamViewer API
apiVersion = "v1"

# URL of the TeamViewer Management Console API
tvApiBaseUrl = "webapi.teamviewer.com"
tvApiPort = 443

currentPath = os.path.abspath(os.path.dirname(sys.argv[0]))


###############
# API Functions
###############

# OAuth2: get an access token by clientId and authorizationCode
def RequestOAuthAccessToken(strClientId, strClientSecret, strAuthorizationCode):
    print
    ""
    print
    "Get token..."
    print
    "Request [POST] /api/" + apiVersion + "/oauth2/token"
    result = False

    try:
        conn = httplib.HTTPSConnection(tvApiBaseUrl, tvApiPort)
        conn.connect()

        request = conn.putrequest('POST', '/api/' + apiVersion + '/oauth2/token')

        payload = "grant_type=authorization_code&code=" + strAuthorizationCode + "&client_id=" + strClientId + "&client_secret=" + strClientSecret

        headers = {}
        headers['Content-Type'] = 'application/x-www-form-urlencoded'
        headers['Content-Length'] = "%d" % len(payload)
        for k in headers:
            conn.putheader(k, headers[k])
        conn.endheaders()

        print
        "Payload :" + payload
        conn.send(payload)

        resp = conn.getresponse()
        statusStr = resp.reason
        statusCode = resp.status

        print
        statusCode, statusStr

        if (statusCode != 200):
            print
            "Unexpected response code. Received content was:"
            print
            resp.read()
            result = False
            return result

        jsonResp = json.loads(resp.read())
        result = jsonResp["access_token"]

        print
        "Token received."
    except Exception:
        print("Request failed! The error was: ")
        result = False

    return result



# Check if API is available and verify token is valid
def PingAPI(accessToken):
    print
    ""
    print
    "Ping API..."
    print
    "Request [GET] /api/" + apiVersion + "/ping"
    result = False

    try:
        conn = httplib.HTTPSConnection(tvApiBaseUrl, tvApiPort)
        conn.connect()

        request = conn.putrequest('GET', '/api/' + apiVersion + '/ping')

        headers = {}
        headers['Authorization'] = 'Bearer ' + accessToken
        for k in headers:
            conn.putheader(k, headers[k])
        conn.endheaders()

        resp = conn.getresponse()
        statusStr = resp.reason
        statusCode = resp.status

        print
        statusCode, statusStr

        if (statusCode != 200):
            print
            "Unexpected response code. Received content was:"
            print
            resp.read()
            result = False
            return result

        jsonResp = json.loads(resp.read())
        tokenValue = jsonResp["token_valid"]

        if (tokenValue == True):
            print
            "Ping: Token is valid"
            result = True
        else:
            result = False
    except Exception:
        print("Request failed! The error was: ")
        result = False

    return result



# get all users of a company with all available fields
def GetAllUsersAPI(accessToken):
    print
    ""
    print
    "Get all users..."
    print
    "Request [GET] /api/" + apiVersion + "/users?full_list=true"
    result = False

    try:
        conn = httplib.HTTPSConnection(tvApiBaseUrl, tvApiPort)
        conn.connect()

        request = conn.putrequest('GET', '/api/' + apiVersion + '/users?full_list=true')

        headers = {}
        headers['Authorization'] = 'Bearer ' + accessToken
        for k in headers:
            conn.putheader(k, headers[k])
        conn.endheaders()

        conn.send("")
        resp = conn.getresponse()
        statusStr = resp.reason
        statusCode = resp.status

        print
        statusCode, statusStr

        if (statusCode != 200):
            print
            "Unexpected response code. Received content was:"
            print
            resp.read()
            result = False
            return result

        result = json.loads(resp.read())
        result = result["users"]

        print
        "Request ok!"

    except Exception:
        print("Request failed! The error was: ")
    result = False

    return result


# get a single company user, identified by email
def GetUserByMail(accessToken, strMail):
    print
    ""
    print
    "Get single user by mail (" + strMail + ")"
    print
    "Request [GET] /api/" + apiVersion + "/users?email=" + strMail + "&full_list=true"
    result = False

    try:
        conn = httplib.HTTPSConnection(tvApiBaseUrl, tvApiPort)
        conn.connect()

        request = conn.putrequest('GET', '/api/' + apiVersion + '/users?email=' + strMail + '&full_list=true')

        headers = {}
        headers['Authorization'] = 'Bearer ' + accessToken
        for k in headers:
            conn.putheader(k, headers[k])
        conn.endheaders()

        conn.send("")

        # Check response
        resp = conn.getresponse()
        statusStr = resp.reason
        statusCode = resp.status

        print
        statusCode, statusStr

        if (statusCode != 200):
            print
            "Unexpected response code. Received content was:"
            print
            resp.read()
            result = False
            return result

        result = json.loads(resp.read())
        result = result["users"]

        print
        "Request ok!"
    except Exception:
        print("Request failed! The error was: ")
        result = False

    return result


# Updates a single company user:
#   Field values in dictUser will be used to update the given user id (updateUserId)
#   if email should be updated, the dict must declare a column "newEmail" with the new email value
def UpdateUser(accessToken, updateUserId, dictUser):
    print
    ""
    print
    "Updating user [" + dictUser["email"] + "]"
    print
    "Request [PUT] /api/" + apiVersion + "/users/" + str(updateUserId)
    result = False

    try:
        conn = httplib.HTTPSConnection(tvApiBaseUrl, tvApiPort)
        conn.connect()
        request = conn.putrequest('PUT', '/api/' + apiVersion + '/users/' + str(updateUserId))

        headers = {}
        headers['Authorization'] = 'Bearer ' + accessToken
        headers['Content-Type'] = 'application/json; charset=utf-8'

        # define update fields
        updatePayload = {}

        # name parameter
        if ("name" in dictUser and len(dictUser["name"]) > 0):
            updatePayload["name"] = dictUser["name"]

        # password parameter
        if ("password" in dictUser and len(dictUser["password"]) > 5):
            updatePayload["password"] = dictUser["password"]

            # permission parameter
        if ("permissions" in dictUser and len(dictUser["permissions"]) > 0):
            updatePayload["permissions"] = dictUser["permissions"]

        # email parameter (column newEmail must exist in csv)
        if ("newMail" in dictUser and len(dictUser["newEmail"]) > 5):
            updatePayload["email"] = dictUser["newEmail"]

            # active parameter (assume every user to be updated is also active per default)
        if ("active" in dictUser and len(dictUser["active"]) > 0):
            updatePayload["active"] = Str2Bool(str(dictUser["active"]))
        else:
            updatePayload["active"] = True

        jsonPayload = json.dumps(updatePayload)

        headers['Content-Length'] = "%d" % len(jsonPayload)

        for k in headers:
            conn.putheader(k, headers[k])
        conn.endheaders()

        print
        "Payload: " + jsonPayload
        conn.send(jsonPayload)

        resp = conn.getresponse()
        statusStr = resp.reason
        statusCode = resp.status

        print
        statusCode, statusStr

        if (statusCode == 204):
            print
            "User updated."
            result = True
        else:
            print
            "Unexpected response code. Received content was:"
            print
            resp.read()
            result = False
            return result

    except Exception:
        print("Request failed! The error was: ")
        result = False

    return result


# Creates a single company user:
#   Field values in dictUser will be used to create the given user.
#   Defaults for some missing fields (permissions, password, language) must be provided.
def CreateUser(accessToken, dictUser, defaultUserPermissions, defaultUserLanguage, defaultUserPassword):
    print
    ""
    print
    "Creating user [" + dictUser["email"] + "]"
    print
    "Request [POST] /api/" + apiVersion + "/users"
    result = False

    try:
        conn = httplib.HTTPSConnection(tvApiBaseUrl, tvApiPort)
        conn.connect()
        request = conn.putrequest('POST', '/api/' + apiVersion + '/users')

        headers = {}
        headers['Authorization'] = 'Bearer ' + accessToken
        headers['Content-Type'] = 'application/json; charset=utf-8'

        # define fields
        createPayload = {}

        # name parameter
        if ("name" in dictUser and len(dictUser["name"]) > 0):
            createPayload["name"] = dictUser["name"]
        else:
            print
            "Field [name] is missing. Can't create user."
            return False

        # email parameter (field [newMail] must exist for this to work)
        if ("email" in dictUser and len(dictUser["email"]) > 5):
            createPayload["email"] = dictUser["email"]
        else:
            print
            "Field [email] is missing. Can't create user."
            return False

        # password parameter
        if ("password" in dictUser and len(dictUser["password"]) > 5):
            createPayload["password"] = dictUser["password"]
        else:  # use defaultUserPassword parameter
            createPayload["password"] = defaultUserPassword

        # permission parameter
        if ("permissions" in dictUser and len(dictUser["permissions"]) > 0):
            createPayload["permissions"] = dictUser["permissions"]
        else:  # use defaultUserPermissions parameter
            createPayload["permissions"] = defaultUserPermissions

        # language parameter
        if ("language" in dictUser and len(dictUser["language"]) > 0):
            createPayload["language"] = dictUser["language"]
        else:  # use defaultUserLanguage parameter
            createPayload["language"] = defaultUserLanguage

        jsonPayload = json.dumps(createPayload)

        headers['Content-Length'] = "%d" % len(jsonPayload)

        for k in headers:
            conn.putheader(k, headers[k])
        conn.endheaders()

        print
        "Payload :" + jsonPayload
        conn.send(jsonPayload)

        resp = conn.getresponse()
        statusStr = resp.reason
        statusCode = resp.status

        print
        statusCode, statusStr

        if (statusCode != 200):
            print
            "Unexpected response code. Received content was:"
            print
            resp.read()
            result = False
            return result

        print
        "Request ok!"

    except Exception:
        print( "Request failed! The error was: ")
        result = False

    return result


# Deactivates a single company user:
def DeactivateUser(accessToken, userId):
    print
    ""
    print
    "Deactivating user [" + str(userId) + "]"
    print
    "Request [PUT] /api/" + apiVersion + "/users/" + str(userId)
    result = False

    try:
        conn = httplib.HTTPSConnection(tvApiBaseUrl, tvApiPort)
        conn.connect()
        request = conn.putrequest('PUT', '/api/' + apiVersion + '/users/' + str(userId))

        headers = {}
        headers['Authorization'] = 'Bearer ' + accessToken
        headers['Content-Type'] = 'application/json; charset=utf-8'

        # define update fields
        updatePayload = {}

        updatePayload["active"] = False

        jsonPayload = json.dumps(updatePayload)

        headers['Content-Length'] = "%d" % len(jsonPayload)

        for k in headers:
            conn.putheader(k, headers[k])
        conn.endheaders()

        print
        "Payload :" + jsonPayload
        conn.send(jsonPayload)

        resp = conn.getresponse()
        statusStr = resp.reason
        statusCode = resp.status

        print
        statusCode, statusStr

        if (statusCode != 204):
            print
            "Unexpected response code. Received content was:"
            print
            resp.read()
            result = False
            return result

        print
        "Request ok!"

    except Exception:
        print("Request failed! The error was: ")
        result = False

    return result


# get all connections of a company with all available fields
def GetAllConnectionsAPI(accessToken):
    print
    ""
    print
    "Get all connections..."
    print
    "Request [GET] /api/" + apiVersion + "/reports/connections"
    result = False

    try:
        conn = httplib.HTTPSConnection(tvApiBaseUrl, tvApiPort)
        conn.connect()

        request = conn.putrequest('GET', '/api/' + apiVersion + '/reports/connections')

        headers = {}
        headers['Authorization'] = 'Bearer ' + accessToken
        for k in headers:
            conn.putheader(k, headers[k])
        conn.endheaders()

        conn.send("")
        resp = conn.getresponse()
        statusStr = resp.reason
        statusCode = resp.status

        print
        statusCode, statusStr

        if (statusCode != 200):
            print
            "Unexpected response code. Received content was:"
            print
            resp.read()
            result = False
            return result

        result = json.loads(resp.read())

        if 'next_offset' in result:
            moreConnections = GetMoreConnectionsAPI(accessToken, result)
            return moreConnections

        if 'records' in result:
            storedConnections = {}
            moreConnections = result["records"]
            storedConnections["Connections %d" % 0] = moreConnections

        print
        "Request ok!"

    except Exception:
        result = False

    return storedConnections


def GetMoreConnectionsAPI(strAccessToken, connectObj):
    result = connectObj
    accessToken = strAccessToken

    storedConnections = {}
    moreConnUrl = ""
    i = int(0)

    # as long as result have item next, loop
    while 'next_offset' in result:
        print
        "More connections found ..."
        # store more connections in dict
        if 'records' in result:
            moreConnections = result["records"]
            storedConnections["Connections %d" % i] = moreConnections
            moreConnUrl = '?offset_id=' + result["next_offset"]

        try:
            conn = httplib.HTTPSConnection(tvApiBaseUrl, tvApiPort)
            conn.connect()

            request = conn.putrequest('GET', '/api/' + apiVersion + '/reports/connections' + moreConnUrl)

            headers = {}
            headers['Authorization'] = 'Bearer ' + accessToken
            for k in headers:
                conn.putheader(k, headers[k])
            conn.endheaders()

            conn.send("")
            resp = conn.getresponse()
            statusStr = resp.reason
            statusCode = resp.status

            print
            statusCode, statusStr

            if (statusCode != 200):
                print("Unexpected response code. Received content was:")
                print
                resp.read()
                result = False
                return result

            result = json.loads(resp.read())
            i = i + 1
        except:
            print('error/exception')

    # writes the last connections in the dictionary
    if 'records' in result:
        moreConnections = result["records"]
        storedConnections["Connections %d" % i] = moreConnections

    return storedConnections


def Str2Bool(str):
    return str.lower() in ("true", "1", "t")
