CREATE TABLE APPLICATION_LOG (ID INTEGER NOT NULL GENERATED BY DEFAULT AS IDENTITY(START WITH 1 INCREMENT BY 1) PRIMARY KEY, SESSION_ID INTEGER, TENANT_ID INTEGER, HOSTNAME VARCHAR(64), USERNAME VARCHAR(64), LOGIN_TIME TIMESTAMP, EVENT_TIME TIMESTAMP, EVENT_TYPE VARCHAR(64), MODEL_CLASS VARCHAR(64), MODEL_UUID VARCHAR(36), PARENT_UUID VARCHAR(36), VALUE_DESC VARCHAR(255), PREV_VALUE CLOB(32K), NEW_VALUE CLOB(32K));


