---
title: Delphi Component Writer 101 และ TThaiDateField
date: 2025-12-19
tags: ["delphi"]
intro: Delphi Custom Component 101 TThaiDateField
seo: Delphi Custom Component 101 TThaiDateField
image: _default.png
active: false
---

# Delphi Custom Component 101 TThaiDateField

```pascal
unit MyThaiDateField;

interface

uses
  System.SysUtils, System.Classes;

type
  TMyThaiDateField = class(TComponent)
  private
    { Private declarations }
  protected
    { Protected declarations }
  public
    { Public declarations }
  published
    { Published declarations }
  end;

procedure Register;

implementation

procedure Register;
begin
  RegisterComponents('tutor4dev', [TMyThaiDateField]);
end;

end.
```

```diff
uses
+  System.SysUtils, System.Classes, Data.DB;
-  System.SysUtils, System.Classes;
```

```pascal
type
  TMyThaiDateField = class(TComponent)
  private
    FDataSet: TDataSet;
    FThaiDateField: string;
  protected
    { Protected declarations }
  public
    { Public declarations }
  published
    property DataSet: TDataSet read FDataSet write FDataSet;
    property ThaiDateField: string read FThaiDateField write FThaiDateField;
  end;
```


