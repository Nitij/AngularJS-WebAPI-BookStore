CREATE TABLE [dbo].[tblBook] (
    [Id]              INT            IDENTITY (1, 1) NOT NULL,
    [Name]            NVARCHAR (100) NOT NULL,
    [AuthorName]      NVARCHAR (50)  NOT NULL,
    [PublisherName]   NVARCHAR (50)  NULL,
    [Price]           INT            NOT NULL,
    [Discount]        REAL           NOT NULL,
    [Rating]          INT            NOT NULL,
    [Language]        NVARCHAR (50)  NOT NULL,
    [PublicationYear] INT            NULL,
    [ISBN13]          NVARCHAR (50)  NULL,
    [ISBN10]          NVARCHAR (50)  NULL,
    [Category]        NVARCHAR (50)  NOT NULL,
    [Image]           NVARCHAR (200) NOT NULL,
    [Details]         NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

