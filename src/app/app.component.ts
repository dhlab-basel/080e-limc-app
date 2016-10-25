import { Component, OnInit } from '@angular/core';
import { SalsahService } from './model/service/salsah.service';

import 'rxjs';

import { JsonConvert } from "json2typescript";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [SalsahService]
})
export class AppComponent implements OnInit {

    constructor(private salsahService: SalsahService) {

    }

    ngOnInit() {

        JsonConvert.debugMode = false;
        JsonConvert.valueCheckingMode = JsonConvert.ValueCheckingMode.ALLOW_NULL;

        /*
         this.salsahService.searchString("Attika", 10, 0).subscribe(
         (search: Search) => { console.log(search); },
         (error: any) => { console.log('error'); this.error = <any>error },
         () => { }
         );*/

        /*
         let resource: MonumentResource = JsonConvert.deserializeString(`
         {
         "resinfo": {
         "project_id": "14",
         "person_id": "86",
         "restype_id": "70",
         "restype_name": "limc:monument",
         "restype_label": "Monument",
         "restype_description": null,
         "restype_iconsrc": "http://www.salsah.org/core/location.php?table=resource_type&field=icon&keyfield=id&keyvalue=70",
         "preview": null,
         "locations": null,
         "locdata": null,
         "resclass_name": "object",
         "resclass_has_location": false,
         "lastmod": "2016-05-06 06:37:10",
         "lastmod_utc": "2016-05-06 04:37:10",
         "value_of": 0
         },
         "resdata": {
         "res_id": "2126048",
         "restype_name": "limc:monument",
         "restype_label": "Monument",
         "iconsrc": "http://www.salsah.org/core/location.php?table=resource_type&field=icon&keyfield=id&keyvalue=70",
         "resclass_name": "object",
         "rights": 8
         },
         "props": {
         "limc:id": {
         "pid": "619",
         "regular_property": 1,
         "valuetype_id": "2",
         "guielement": "text",
         "is_annotation": "0",
         "label": "ID",
         "attributes": null,
         "occurrence": "1",
         "values": [
         "203017"
         ],
         "value_ids": [
         "8773037"
         ],
         "comments": [
         ""
         ],
         "value_rights": [
         "4"
         ],
         "value_iconsrcs": [
         null
         ],
         "value_restype": [
         null
         ],
         "value_firstprops": [
         null
         ]
         },
         "limc:discovery": {
         "pid": "327",
         "regular_property": 1,
         "valuetype_id": "7",
         "guielement": "pulldown",
         "is_annotation": "0",
         "label": "Entdeckungsort",
         "attributes": "selection=42",
         "occurrence": "0-1",
         "values": [
         "4894"
         ],
         "value_ids": [
         "8773039"
         ],
         "comments": [
         ""
         ],
         "value_rights": [
         "4"
         ],
         "value_iconsrcs": [
         null
         ],
         "value_restype": [
         null
         ],
         "value_firstprops": [
         null
         ]
         },
         "limc:discoveryDetail": {
         "pid": "374",
         "regular_property": 1,
         "valuetype_id": "7",
         "guielement": "pulldown",
         "is_annotation": "0",
         "label": "Entdeckungsort Details",
         "attributes": "selection=43",
         "occurrence": "0-n"
         },
         "limc:object": {
         "pid": "375",
         "regular_property": 1,
         "valuetype_id": "7",
         "guielement": "pulldown",
         "is_annotation": "0",
         "label": "Objekt",
         "attributes": "selection=44",
         "occurrence": "1",
         "values": [
         "4896"
         ],
         "value_ids": [
         "8773040"
         ],
         "comments": [
         ""
         ],
         "value_rights": [
         "4"
         ],
         "value_iconsrcs": [
         null
         ],
         "value_restype": [
         null
         ],
         "value_firstprops": [
         null
         ]
         },
         "limc:material": {
         "pid": "376",
         "regular_property": 1,
         "valuetype_id": "7",
         "guielement": "pulldown",
         "is_annotation": "0",
         "label": "Material",
         "attributes": "selection=45",
         "occurrence": "1",
         "values": [
         "5056"
         ],
         "value_ids": [
         "8773041"
         ],
         "comments": [
         ""
         ],
         "value_rights": [
         "4"
         ],
         "value_iconsrcs": [
         null
         ],
         "value_restype": [
         null
         ],
         "value_firstprops": [
         null
         ]
         },
         "limc:origin": {
         "pid": "377",
         "regular_property": 1,
         "valuetype_id": "7",
         "guielement": "pulldown",
         "is_annotation": "0",
         "label": "Herkunft",
         "attributes": "selection=46",
         "occurrence": "1",
         "values": [
         "5070"
         ],
         "value_ids": [
         "8773042"
         ],
         "comments": [
         ""
         ],
         "value_rights": [
         "4"
         ],
         "value_iconsrcs": [
         null
         ],
         "value_restype": [
         null
         ],
         "value_firstprops": [
         null
         ]
         },
         "limc:country": {
         "pid": "347",
         "regular_property": 1,
         "valuetype_id": "7",
         "guielement": "pulldown",
         "is_annotation": "0",
         "label": "Land",
         "attributes": "selection=36",
         "occurrence": "0-1",
         "values": [
         "2005"
         ],
         "value_ids": [
         "8773043"
         ],
         "comments": [
         ""
         ],
         "value_rights": [
         "4"
         ],
         "value_iconsrcs": [
         null
         ],
         "value_restype": [
         null
         ],
         "value_firstprops": [
         null
         ]
         },
         "limc:artist": {
         "pid": "378",
         "regular_property": 1,
         "valuetype_id": "7",
         "guielement": "pulldown",
         "is_annotation": "0",
         "label": "Künstler",
         "attributes": "selection=47",
         "occurrence": "0-n"
         },
         "limc:category": {
         "pid": "379",
         "regular_property": 1,
         "valuetype_id": "7",
         "guielement": "pulldown",
         "is_annotation": "0",
         "label": "Kategorie",
         "attributes": "selection=48",
         "occurrence": "0-n",
         "values": [
         "4868"
         ],
         "value_ids": [
         "8773045"
         ],
         "comments": [
         ""
         ],
         "value_rights": [
         "4"
         ],
         "value_iconsrcs": [
         null
         ],
         "value_restype": [
         null
         ],
         "value_firstprops": [
         null
         ]
         },
         "limc:technique": {
         "pid": "380",
         "regular_property": 1,
         "valuetype_id": "7",
         "guielement": "pulldown",
         "is_annotation": "0",
         "label": "Technik",
         "attributes": "selection=49",
         "occurrence": "0-n",
         "values": [
         "5063"
         ],
         "value_ids": [
         "8773044"
         ],
         "comments": [
         ""
         ],
         "value_rights": [
         "4"
         ],
         "value_iconsrcs": [
         null
         ],
         "value_restype": [
         null
         ],
         "value_firstprops": [
         null
         ]
         },
         "limc:keyword": {
         "pid": "357",
         "regular_property": 1,
         "valuetype_id": "7",
         "guielement": "pulldown",
         "is_annotation": "0",
         "label": "Stichwort",
         "attributes": "selection=41",
         "occurrence": "0-n"
         },
         "limc:scenename": {
         "pid": "356",
         "regular_property": 1,
         "valuetype_id": "7",
         "guielement": "pulldown",
         "is_annotation": "0",
         "label": "Name",
         "attributes": "selection=65",
         "occurrence": "0-n"
         },
         "limc:dimension": {
         "pid": "381",
         "regular_property": 1,
         "valuetype_id": "1",
         "guielement": "text",
         "is_annotation": "0",
         "label": "Grössenangabe",
         "attributes": null,
         "occurrence": "0-1"
         },
         "limc:description": {
         "pid": "353",
         "regular_property": 1,
         "valuetype_id": "1",
         "guielement": "text",
         "is_annotation": "0",
         "label": "Beschreibung",
         "attributes": null,
         "occurrence": "0-1"
         },
         "limc:inscription": {
         "pid": "354",
         "regular_property": 1,
         "valuetype_id": "1",
         "guielement": "text",
         "is_annotation": "0",
         "label": "Inschrift",
         "attributes": null,
         "occurrence": "0-1"
         },
         "limc:bibliography": {
         "pid": "355",
         "regular_property": 1,
         "valuetype_id": "1",
         "guielement": "text",
         "is_annotation": "0",
         "label": "Bibliographie",
         "attributes": null,
         "occurrence": "0-1",
         "values": [
         "ARV(2) 1594, 48; Para 507; Add(2) 389; Waldhauer, O., Die Schwalbenvase, AA (1927) 70-75 Beil. 1-2; Simon/Hirmer, Vasen 102 pl. 116."
         ],
         "value_ids": [
         "8773038"
         ],
         "comments": [
         ""
         ],
         "value_rights": [
         "4"
         ],
         "value_iconsrcs": [
         null
         ],
         "value_restype": [
         null
         ],
         "value_firstprops": [
         null
         ]
         },
         "limc:comment": {
         "pid": "345",
         "regular_property": 1,
         "valuetype_id": "1",
         "guielement": "richtext",
         "is_annotation": "0",
         "label": "Kommentar",
         "attributes": null,
         "occurrence": "0-1"
         },
         "limc:dating": {
         "pid": "358",
         "regular_property": 1,
         "valuetype_id": "6",
         "guielement": "searchbox",
         "is_annotation": "0",
         "label": "Datierung",
         "attributes": "restypeid=79",
         "occurrence": "0-n",
         "values": [
         "2001819"
         ],
         "value_ids": [
         "8773048"
         ],
         "comments": [
         ""
         ],
         "value_rights": [
         "4"
         ],
         "value_iconsrcs": [
         "http://www.salsah.org/core/location.php?table=resource_type&field=icon&keyfield=id&keyvalue=79"
         ],
         "value_restype": [
         "Dating"
         ],
         "value_firstprops": [
         "-510-01-01 - -500-12-31"
         ]
         },
         "limc:scene": {
         "pid": "382",
         "regular_property": 1,
         "valuetype_id": "6",
         "guielement": "searchbox",
         "is_annotation": "0",
         "label": "Szene",
         "attributes": "restypeid=80",
         "occurrence": "0-n",
         "values": [
         "2070193"
         ],
         "value_ids": [
         "8773047"
         ],
         "comments": [
         ""
         ],
         "value_rights": [
         "4"
         ],
         "value_iconsrcs": [
         "http://www.salsah.org/core/location.php?table=resource_type&field=icon&keyfield=id&keyvalue=80"
         ],
         "value_restype": [
         "Szene"
         ],
         "value_firstprops": [
         "100051"
         ]
         },
         "limc:inventory": {
         "pid": "383",
         "regular_property": 1,
         "valuetype_id": "6",
         "guielement": "searchbox",
         "is_annotation": "0",
         "label": "Inventar",
         "attributes": "restypeid=82",
         "occurrence": "0-n",
         "values": [
         "1880390"
         ],
         "value_ids": [
         "8773046"
         ],
         "comments": [
         ""
         ],
         "value_rights": [
         "4"
         ],
         "value_iconsrcs": [
         "http://www.salsah.org/core/location.php?table=resource_type&field=icon&keyfield=id&keyvalue=82"
         ],
         "value_restype": [
         "Inventar"
         ],
         "value_firstprops": [
         "1. Inv."
         ]
         }
         },
         "incoming": [],
         "access": "OK",
         "status": 0,
         "userdata": {
         "lang": "de",
         "language_id": "1",
         "user_id": "86",
         "token": "",
         "username": "limc",
         "firstname": "Limc",
         "lastname": "Limc",
         "active_project": 14,
         "projects": {
         "14": "65807"
         },
         "projects_info": [
         {
         "id": "14",
         "shortname": "LIMC",
         "longname": "Lexicon Iconographicum Mythlogiae Classicae"
         }
         ],
         "PHPSESSION": "TRUE"
         }
         }`, MonumentResource);

         console.log(resource);


         /*
         //return;
         let jsonData = '{}';

         try {
         let userData: UserData = JsonConvert.deserializeObject(jsonData, UserData);
         //console.log(userData.d_array3[2].greeting());
         //console.log(userData.d_array1[0].greeting());
         } catch (e) {
         //console.log((<Error>e));//conversion to Error type
         }
         /*new UserData();


         //console.log(json.userdata);

         console.log("Starting Logging");
         let data = new UserData();
         Object.keys(data).forEach((key) => {

         console.log(key);
         });

         console.log(Object.prototype);*/


        /*
         this.salsahService.getResourceById(2126046).subscribe(
         (monument: Monument) => { this.monument = monument; },
         (error: any) => { console.log('error'); this.error = <any>error },
         () => { }
         );*/
    }
}
