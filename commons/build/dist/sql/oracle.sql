CREATE TABLE PERMISSION_DB_BEAN (ID NUMBER NOT NULL, ACCESS_TYPE NVARCHAR2(255), CLASS_TYPE NVARCHAR2(255), PRIMARY KEY (ID));
CREATE SEQUENCE PERMISSION_BEAN_SEQUENCE START WITH 100;

CREATE TABLE ROLE_DB_BEAN (ID NUMBER NOT NULL PRIMARY KEY, ROLE_NAME NVARCHAR2(255), TENANT_ID INTEGER NOT NULL);
CREATE INDEX I_ROLE_NAME ON ROLE_DB_BEAN (ROLE_NAME, TENANT_ID);
CREATE SEQUENCE ROLE_BEAN_SEQUENCE START WITH 4;

CREATE TABLE ROLE_PERMISSION_MAP (ROLE_ID NUMBER NOT NULL, PERMISSION_ID NUMBER NOT NULL);
CREATE INDEX I_ROLE_PERMISSION ON ROLE_PERMISSION_MAP (ROLE_ID, PERMISSION_ID);

CREATE TABLE USER_DB_BEAN (ID NUMBER NOT NULL PRIMARY KEY, TENANT_ID INTEGER NOT NULL, PASSWORD BLOB, USER_NAME NVARCHAR2(255), PASSWORD_HIST1 BLOB, PASSWORD_HIST2 BLOB, PASSWORD_HIST3 BLOB, PASSWORD_HIST4 BLOB, PASSWORD_HIST5 BLOB, PASSWORD_HIST6 BLOB, PASSWORD_HIST7 BLOB, FORCE_RESET NUMBER(1), PASSWORD_SET_DATE DATE, LOGIN_ATTEMPTS NUMBER, UNLOCK_DATE TIMESTAMP);
CREATE INDEX I_USER_NAME ON USER_DB_BEAN (USER_NAME);
CREATE SEQUENCE USER_BEAN_SEQUENCE START WITH 2;

CREATE TABLE USER_ROLE_MAP (USER_ID NUMBER NOT NULL, ROLE_ID NUMBER NOT NULL);
CREATE INDEX I_USER_ROLE ON USER_ROLE_MAP (USER_ID, ROLE_ID);

CREATE TABLE OBJECT_LOCK_BEAN (ID NUMBER NOT NULL, TENANT_ID INTEGER NOT NULL, CLASS_NAME NVARCHAR2(255) NOT NULL, LOCK_TIME TIMESTAMP, USER_NAME NVARCHAR2(255), APPLICATION_NAME NVARCHAR2(255), HOST_NAME NVARCHAR2(255), PRIMARY KEY(ID, CLASS_NAME));

CREATE TABLE SYSTEM_PROPERTY (PROPERTY_NAME NVARCHAR2(255) NOT NULL, PROPERTY_VALUE NVARCHAR2(255), TENANT_ID NUMBER NOT NULL, PRIMARY KEY(PROPERTY_NAME, TENANT_ID));

CREATE TABLE CONFIGURED_ITEM (IDX NUMBER NOT NULL PRIMARY KEY, TENANT_ID NUMBER NOT NULL, UUID_MSB NUMBER(19,0) NOT NULL, UUID_LSB NUMBER(19,0) NOT NULL, ITEM_NAME NVARCHAR2(255), TYPE_NAME NVARCHAR2(255), XML NCLOB);
CREATE INDEX I_CONFIGURED_ITEM_UUID ON CONFIGURED_ITEM (UUID_MSB, UUID_LSB, TENANT_ID);
CREATE INDEX I_CONFIGURED_ITEM_NAME ON CONFIGURED_ITEM (ITEM_NAME, TENANT_ID);
CREATE INDEX I_CONFIGURED_ITEM_TYPE ON CONFIGURED_ITEM (TYPE_NAME, TENANT_ID);
CREATE SEQUENCE CONFIGURED_ITEM_SEQUENCE START WITH 100;

CREATE TABLE RESOURCE_ROLE_MAP (ROLE_ID NUMBER NOT NULL, RESOURCE_KEY NVARCHAR2(255) NOT NULL, TENANT_ID NUMBER NOT NULL);
CREATE INDEX I_RESOURCE_ROLE ON RESOURCE_ROLE_MAP (RESOURCE_KEY, TENANT_ID);

CREATE TABLE TENANT (ID NUMBER NOT NULL PRIMARY KEY, NAME NVARCHAR2(255) NOT NULL, DESCRIPTION NVARCHAR2(255), IS_DEFAULT NUMBER(1, 0) DEFAULT 0 NOT NULL CHECK (IS_DEFAULT IN (0, 1)));
CREATE INDEX I_TENANT_NAME ON TENANT (NAME);
CREATE SEQUENCE TENANT_SEQUENCE START WITH 2;

INSERT INTO TENANT VALUES (1, 'System', 'Default System tenant', 1);

INSERT INTO SYSTEM_PROPERTY VALUES ('SECURITY_PASSWORD_EXPIRE_DAYS', '30', 1);
INSERT INTO SYSTEM_PROPERTY VALUES ('SECURITY_PASSWORD_HISTORY', '3', 1);
INSERT INTO SYSTEM_PROPERTY VALUES ('PASSWORD_UPPER_REQUIRED_PROPERTY', 'true', 1);
INSERT INTO SYSTEM_PROPERTY VALUES ('PASSWORD_LOWER_REQUIRED_PROPERTY', 'true', 1);
INSERT INTO SYSTEM_PROPERTY VALUES ('PASSWORD_NUMERIC_REQUIRED_PROPERTY', 'true', 1);
INSERT INTO SYSTEM_PROPERTY VALUES ('PASSWORD_SYMBOL_REQUIRED_PROPERTY', 'true', 1);
INSERT INTO SYSTEM_PROPERTY VALUES ('PASSWORD_REQUIRED_COUNT_PROPERTY', '3', 1);
INSERT INTO SYSTEM_PROPERTY VALUES ('PASSWORD_MAXIMUM_LENGTH_PROPERTY', '20', 1);
INSERT INTO SYSTEM_PROPERTY VALUES ('PASSWORD_MINIMUM_LENGTH_PROPERTY', '8', 1);
INSERT INTO SYSTEM_PROPERTY VALUES ('PASSWORD_MAXIMUM_LOGIN_ATTEMPTS_PROPERTY', '5', 1);
INSERT INTO SYSTEM_PROPERTY VALUES ('PASSWORD_LOCKOUT_MINUTES_PROPERTY', '15', 1);

INSERT INTO USER_DB_BEAN (ID, USER_NAME, FORCE_RESET, TENANT_ID) VALUES (1, 'admin', 0, 1);

INSERT INTO PERMISSION_DB_BEAN VALUES (1, 'r', 'com.ali.commons.security.UserBean');
INSERT INTO PERMISSION_DB_BEAN VALUES (2, 'w', 'com.ali.commons.security.UserBean');
INSERT INTO PERMISSION_DB_BEAN VALUES (3, 'c', 'com.ali.commons.security.UserBean');
INSERT INTO PERMISSION_DB_BEAN VALUES (4, 'd', 'com.ali.commons.security.UserBean');
INSERT INTO PERMISSION_DB_BEAN VALUES (5, 'r', 'com.ali.commons.security.RoleBean');
INSERT INTO PERMISSION_DB_BEAN VALUES (6, 'w', 'com.ali.commons.security.RoleBean');
INSERT INTO PERMISSION_DB_BEAN VALUES (7, 'c', 'com.ali.commons.security.RoleBean');
INSERT INTO PERMISSION_DB_BEAN VALUES (8, 'd', 'com.ali.commons.security.RoleBean');
INSERT INTO PERMISSION_DB_BEAN VALUES (9, 'r', 'com.ali.commons.security.RootSecurityManager');
INSERT INTO PERMISSION_DB_BEAN VALUES (10, 'w', 'com.ali.commons.security.RootSecurityManager');
INSERT INTO PERMISSION_DB_BEAN VALUES (11, 'r', 'com.ali.commons.security.ResourceRoleBean');
INSERT INTO PERMISSION_DB_BEAN VALUES (12, 'w', 'com.ali.commons.security.ResourceRoleBean');
INSERT INTO PERMISSION_DB_BEAN VALUES (13, 'r', 'com.ali.commons.security.TenantBean');
INSERT INTO PERMISSION_DB_BEAN VALUES (14, 'w', 'com.ali.commons.security.TenantBean');
INSERT INTO PERMISSION_DB_BEAN VALUES (15, 'c', 'com.ali.commons.security.TenantBean');
INSERT INTO PERMISSION_DB_BEAN VALUES (16, 'd', 'com.ali.commons.security.TenantBean');

INSERT INTO ROLE_DB_BEAN VALUES (1, 'Administrator', 1);
INSERT INTO ROLE_DB_BEAN VALUES (2, 'View Only', 1);
INSERT INTO ROLE_DB_BEAN VALUES (3, 'User Administrator', 1);

INSERT INTO USER_ROLE_MAP VALUES (1, 1);
INSERT INTO USER_ROLE_MAP VALUES (1, 2);

INSERT INTO ROLE_PERMISSION_MAP VALUES (1, 1);
INSERT INTO ROLE_PERMISSION_MAP VALUES (1, 2);
INSERT INTO ROLE_PERMISSION_MAP VALUES (1, 3);
INSERT INTO ROLE_PERMISSION_MAP VALUES (1, 4);
INSERT INTO ROLE_PERMISSION_MAP VALUES (1, 5);
INSERT INTO ROLE_PERMISSION_MAP VALUES (1, 6);
INSERT INTO ROLE_PERMISSION_MAP VALUES (1, 7);
INSERT INTO ROLE_PERMISSION_MAP VALUES (1, 8);
INSERT INTO ROLE_PERMISSION_MAP VALUES (1, 9);
INSERT INTO ROLE_PERMISSION_MAP VALUES (1, 10);
INSERT INTO ROLE_PERMISSION_MAP VALUES (1, 11);
INSERT INTO ROLE_PERMISSION_MAP VALUES (1, 12);

INSERT INTO ROLE_PERMISSION_MAP VALUES (2, 1);
INSERT INTO ROLE_PERMISSION_MAP VALUES (2, 5);
INSERT INTO ROLE_PERMISSION_MAP VALUES (2, 9);
INSERT INTO ROLE_PERMISSION_MAP VALUES (2, 11);

INSERT INTO ROLE_PERMISSION_MAP VALUES (3, 1);
INSERT INTO ROLE_PERMISSION_MAP VALUES (3, 2);
INSERT INTO ROLE_PERMISSION_MAP VALUES (3, 3);
INSERT INTO ROLE_PERMISSION_MAP VALUES (3, 4);
INSERT INTO ROLE_PERMISSION_MAP VALUES (3, 5);
INSERT INTO ROLE_PERMISSION_MAP VALUES (3, 6);
INSERT INTO ROLE_PERMISSION_MAP VALUES (3, 7);
INSERT INTO ROLE_PERMISSION_MAP VALUES (3, 8);
INSERT INTO ROLE_PERMISSION_MAP VALUES (3, 9);
INSERT INTO ROLE_PERMISSION_MAP VALUES (3, 10);
INSERT INTO ROLE_PERMISSION_MAP VALUES (3, 11);
INSERT INTO ROLE_PERMISSION_MAP VALUES (3, 12);

ALTER TABLE user_db_bean ADD user_admin number(1) DEFAULT 0 NOT NULL;
INSERT INTO USER_DB_BEAN (ID,USER_NAME,FORCE_RESET, TENANT_ID,USER_ADMIN) VALUES (USER_BEAN_SEQUENCE.NEXTVAL, 'useradmin', 0, 1,1);
INSERT INTO USER_ROLE_MAP VALUES (USER_BEAN_SEQUENCE.CURRVAL, 3);

ALTER TABLE USER_DB_BEAN ADD LAST_LOGIN_DATE DATE DEFAULT SYSDATE NOT NULL;

-- insert the new useradmin view only role
INSERT INTO ROLE_DB_BEAN VALUES (ROLE_BEAN_SEQUENCE.NEXTVAL, 'User Administrator View Only', 1);

-- insert the new useradmin view only role permissions
INSERT INTO ROLE_PERMISSION_MAP (ROLE_ID, PERMISSION_ID)
SELECT ROLE_BEAN_SEQUENCE.CURRVAL, PERMISSION_ID FROM ROLE_PERMISSION_MAP WHERE ROLE_ID=2;


CREATE SEQUENCE NOBLE_LCH_SEQ START WITH 100;
CREATE TABLE NOBLE_LCH ( ID NUMBER NOT NULL PRIMARY KEY, CREATE_DATE TIMESTAMP NOT NULL, "COUNT" BLOB NOT NULL, "DATE" BLOB NOT NULL, "HOUR" BLOB NOT NULL);

CREATE SEQUENCE NOBLE_L_SEQ START WITH 100;
CREATE TABLE NOBLE_L (ID NUMBER NOT NULL PRIMARY KEY, LCOUNT BLOB NOT NULL, EXPIRY_DATE BLOB NOT NULL, LASTCHECKED BLOB, WARN_PCNT_USED BLOB NOT NULL, WARN_DAYS_PRIOR_EXPY BLOB NOT NULL, DAYS_WARN_MCU BLOB NOT NULL, USER_COUNT BLOB, USER_DATE BLOB, USER_HOUR BLOB, IS_EXPIRED BLOB, IS_EXCEEDED BLOB, EXCEEDED_DATE BLOB);
