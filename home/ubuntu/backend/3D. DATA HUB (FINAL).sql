-- Gender table
CREATE TABLE "Gender" (
    -- Unique identifier for each gender (e.g., 'M', 'F', etc.)
    "GENDERID" CHAR(1)   NOT NULL,
    -- Description of the gender (e.g., 'MALE', 'FEMALE', etc.)
    "DESCRIPTION" TEXT   NOT NULL,
    -- Username or identifier of the person who last updated the record
    "LASTUPDATEDBY" VARCHAR   NOT NULL,
    -- DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP Timestamp for when the record is last updated or inserted
    "TIMESTAMP" TIMESTAMP   NOT NULL,
    -- Indicates if the record is currently active
    "ISACTIVE" BOOLEAN   NOT NULL,
    CONSTRAINT "pk_Gender" PRIMARY KEY (
        "GENDERID"
     )
);

-- Age groups table
CREATE TABLE "AgeGroups" (
    -- Unique identifier for each age group
    "AGEGROUPID"  SERIAL  NOT NULL,
    -- Descriptive range of the age group (e.g., "0-4", "5-9")
    "AGERANGE" TEXT   NOT NULL,
    -- Username or identifier of the person who last updated the record
    "LASTUPDATEDBY" VARCHAR   NOT NULL,
    -- DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP Timestamp for when the record is last updated or inserted
    "TIMESTAMP" TIMESTAMP   NOT NULL,
    -- Indicates if the record is currently active
    "ISACTIVE" BOOLEAN   NOT NULL,
    CONSTRAINT "pk_AgeGroups" PRIMARY KEY (
        "AGEGROUPID"
     )
);

CREATE TABLE "MaritalStatus" (
    -- Unique identifier for marital status category
    "MARITALSTATUSID"  SERIAL  NOT NULL,
    -- Description of the marital status (e.g., 'SINGLE', 'MARRIED', etc.)
    "DESCRIPTION" TEXT   NOT NULL,
    -- Username or identifier of the person who last updated the record
    "LASTUPDATEDBY" VARCHAR   NOT NULL,
    -- DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP Timestamp for when the record is last updated or inserted
    "TIMESTAMP" TIMESTAMP   NOT NULL,
    -- Indicates if the record is currently active
    "ISACTIVE" BOOLEAN   NOT NULL,
    CONSTRAINT "pk_MaritalStatus" PRIMARY KEY (
        "MARITALSTATUSID"
     )
);

CREATE TABLE "EconomicallyActiveStatus" (
    -- Unique identifier for economically active status
    "ECONOMICALLYACTIVESTATUSID"  SERIAL  NOT NULL,
    -- Description of the economic activity status (e.g., 'ACTIVE', 'INACTIVE')
    "DESCRIPTION" TEXT   NOT NULL,
    -- Username or identifier of the person who last updated the record
    "LASTUPDATEDBY" VARCHAR   NOT NULL,
    -- DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP Timestamp for when the record is last updated or inserted
    "TIMESTAMP" TIMESTAMP   NOT NULL,
    -- Indicates if the record is currently active
    "ISACTIVE" BOOLEAN   NOT NULL,
    CONSTRAINT "pk_EconomicallyActiveStatus" PRIMARY KEY (
        "ECONOMICALLYACTIVESTATUSID"
     )
);

CREATE TABLE "ResidentialStatus" (
    -- Unique identifier for each residential status
    "RESIDENTIALSTATUSID"  SERIAL  NOT NULL,
    -- Description of the residential status (e.g., 'URBAN', 'RURAL')
    "STATUSDESCRIPTION" TEXT   NOT NULL,
    -- Username or identifier of the person who last updated the record
    "LASTUPDATEDBY" VARCHAR   NOT NULL,
    -- DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP Timestamp for when the record is last updated or inserted
    "TIMESTAMP" TIMESTAMP   NOT NULL,
    -- Indicates if the record is currently active
    "ISACTIVE" BOOLEAN   NOT NULL,
    CONSTRAINT "pk_ResidentialStatus" PRIMARY KEY (
        "RESIDENTIALSTATUSID"
     )
);

CREATE TABLE "HouseholdRole" (
    -- Unique identifier for each household role
    "HOUSEHOLDROLEID"  SERIAL  NOT NULL,
    -- Description of the household role (e.g., 'HEAD OF HOUSEHOLD', 'SPOUSE OR PARTNER', etc.)
    "HOUSEHOLDROLEDESCRIPTION" TEXT   NOT NULL,
    -- Username or identifier of the person who last updated the record
    "LASTUPDATEDBY" VARCHAR   NOT NULL,
    -- DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP Timestamp for when the record is last updated or inserted
    "TIMESTAMP" TIMESTAMP   NOT NULL,
    -- Indicates if the record is currently active
    "ISACTIVE" BOOLEAN   NOT NULL,
    CONSTRAINT "pk_HouseholdRole" PRIMARY KEY (
        "HOUSEHOLDROLEID"
     )
);

CREATE TABLE "EducationalLevel" (
    -- Unique identifier for educational level