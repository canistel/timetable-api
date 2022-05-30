-- CREATE USER TABLE
CREATE TABLE USER(
    ID INTEGER PRIMARY KEY AUTO_INCREMENT,
    USERNAME VARCHAR(100) UNIQUE,
    PASSWORD VARCHAR(100)
);

-- CREATE TIMETABLE TABLE
CREATE TABLE TIMETABLE(
    ID INTEGER PRIMARY KEY,
    USER_ID INTEGER,
    DESCRIPTION VARCHAR(500),
    CONSTRAINT FOREIGN KEY(USER_ID)
    REFERENCES USER(ID)
);

-- CREATE SCHUDLE TABLE
CREATE TABLE SCHEDULE(
    ID INTEGER PRIMARY KEY,
    TIMETABLE_ID INTEGER,
    START DATETIME,
    END DATETIME,
    DESCRIPTION VARCHAR(500),
    FINISHED BOOLEAN,
    CONSTRAINT FOREIGN KEY(TIMETABLE_ID)
    REFERENCES TIMETABLE(ID)
);
