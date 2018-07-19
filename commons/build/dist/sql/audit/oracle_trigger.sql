create or replace trigger APPLICATION_LOG_TRG
before insert on APPLICATION_LOG
for each row
begin
select APPLICATION_LOG_SEQ.nextval into :new.ID from dual;
end;
/