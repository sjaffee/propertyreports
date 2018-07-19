CREATE SEQUENCE APPLICATION_LOG_SEQ;
CREATE TABLE APPLICATION_LOG (ID BIGINT NOT NULL PRIMARY KEY DEFAULT nextval('APPLICATION_LOG_SEQ'), SESSION_ID INTEGER, TENANT_ID INTEGER, HOSTNAME VARCHAR(64), USERNAME VARCHAR(64), LOGIN_TIME TIMESTAMP, EVENT_TIME TIMESTAMP, EVENT_TYPE VARCHAR(64), MODEL_CLASS VARCHAR(64), MODEL_UUID VARCHAR(36), PARENT_UUID VARCHAR(36), VALUE_DESC VARCHAR(255), PREV_VALUE VARCHAR, NEW_VALUE VARCHAR);
ALTER SEQUENCE APPLICATION_LOG_SEQ OWNED BY APPLICATION_LOG.ID;