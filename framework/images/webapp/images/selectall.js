/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Check Box Select/Toggle Functions for Select/Toggle All

function toggle(e) {
    e.checked = !e.checked;
}

function checkToggleDefault(e) {
    checkToggle(e, "selectAllForm");
}
function checkToggle(e, formName) {
    var cform = document[formName];
    if (e.checked) {
        var len = cform.elements.length;
        var allchecked = true;
        for (var i = 0; i < len; i++) {
            var element = cform.elements[i];
            if (element.name.substring(0, 10) == "_rowSubmit" && !element.checked) {
                allchecked = false;
            }
            cform.selectAll.checked = allchecked;
        }
    } else {
        cform.selectAll.checked = false;
    }
}

function toggleAllDefault(e) {
    toggleAll(e, "selectAllForm");
}
function toggleAll(e, formName) {
    var cform = document[formName];
    var len = cform.elements.length;
    for (var i = 0; i < len; i++) {
        var element = cform.elements[i];
        if (element.name.substring(0, 10) == "_rowSubmit" && element.checked != e.checked) {
            toggle(element);
        }
    }
}

function selectAllDefault() {
    selectAll("selectAllForm");
}
function selectAll(formName) {
    var cform = document[formName];
    var len = cform.elements.length;
    for (var i = 0; i < len; i++) {
        var element = cform.elements[i];
        if ((element.name == "selectAll" || element.name.substring(0, 10) == "_rowSubmit") && !element.checked) {
            toggle(element);
        }
    }
}

function removeSelectedDefault() {
    removeSelected("selectAllForm");
}
function removeSelected(formName) {
    var cform = document[formName];
    cform.removeSelected.value = true;
    cform.submit();
}

// highlight the selected row(s)

function highlightRow(e,rowId){
    var currentClassName = document.getElementById(rowId).className;
    if (e.checked) {
        if (currentClassName == '' ) {
            document.getElementById(rowId).className = 'selected';
        } else if (currentClassName == 'alternate-row') {
            document.getElementById(rowId).className = 'alternate-rowSelected';
        }
    } else {
        if (currentClassName == 'selected') {
            document.getElementById(rowId).className = '';
        } else if (currentClassName == 'alternate-rowSelected') {
            document.getElementById(rowId).className = 'alternate-row';
        }
    }
}

function highlightAllRows(e, halfRowId, formName){
    var cform = document[formName];
    var len = cform.elements.length;
    for (var i = 0; i < len; i++) {
        var element = cform.elements[i];
        if (element.name.substring(0, 10) == "_rowSubmit") {
            highlightRow(e, halfRowId+element.name.substring(13));
        }
    }
}

// popup windows functions

function popUp(url, name, height, width) {
    popupWindow = window.open(url, name, 'location=no,scrollbars,width=' + width + ',height=' + height);
}
function popUpSmall(url, name) {
    popUp(url, name, '300', '450');
}
function popUpPrint(printserver, screen1) {
    popUpPrint(printserver, screen1, null, null);
}
function popUpPrint(printserver, screen1, screen2) {
    popUpPrint(printserver, screen1, screen2, null);
}
function popUpPrint(printserver, screen1, screen2, screen3) {
    if  (printserver == null) {
        printserver = "http://localhost:10080/"; // default print server port
    }

    if (screen1 != null) {
        screen1 = screen1.replace(/\:/g, "%3A");
        screen1 = screen1.replace(/\//g, "%2F");
        screen1 = screen1.replace(/\#/g, "%23");
        screen1 = screen1.replace(/\?/g, "%3F");
        screen1 = screen1.replace(/\=/g, "%3D");
        url = printserver + screen1;
        window.open(url, "screen1", 'location=no,statusbar=1,menubar=0,scrollbars,width=60,height=10,top=0,left=0');
        self.focus();

        if (screen2 != null) {
            screen2 = screen2.replace(/\:/g, "%3A");
            screen2 = screen2.replace(/\//g, "%2F");
            screen2 = screen2.replace(/\#/g, "%23");
            screen2 = screen2.replace(/\?/g, "%3F");
            screen2 = screen2.replace(/\=/g, "%3D");
            url = printserver + screen2;
            window.open(url, "screen2", 'location=no,statusbar=1,menubar=0,scrollbars,width=60,height=10,top=0,left=0');
            self.focus();

            if (screen3 != null) {
                screen3 = screen3.replace(/\:/g, "%3A");
                screen3 = screen3.replace(/\//g, "%2F");
                screen3 = screen3.replace(/\#/g, "%23");
                screen3 = screen3.replace(/\?/g, "%3F");
                screen3 = screen3.replace(/\=/g, "%3D");
                url = printserver + screen3;
                window.open(url, "screen13", 'location=no,statusbar=1,menubar=0,scrollbars,width=60,height=10,top=0,left=0');
                self.focus();
            }
        }
    }
}

// Post a form from a pop up using the parent window
function doPostViaParent(formName) {
    var theForm = document[formName];
    var newForm = theForm.cloneNode(true);
    var hiddenDiv = document.createElement('div');
    hiddenDiv.style.visibility = 'hidden';
    hiddenDiv.appendChild(newForm);
    window.opener.document.body.appendChild(hiddenDiv);
    newForm.submit();
    window.opener.focus();
}
// From a child window, navigate the parent window to the supplied url
function doGetViaParent(url) {
    window.opener.location = url;
    window.opener.focus();
}

// hidden div functions

function getStyleObject(objectId) {
    if (document.getElementById && document.getElementById(objectId)) {
        return document.getElementById(objectId).style;
    } else if (document.all && document.all(objectId)) {
        return document.all(objectId).style;
    } else if (document.layers && document.layers[objectId]) {
        return document.layers[objectId];
    } else {
        return false;
    }
}
function changeObjectVisibility(objectId, newVisibility) {
    var styleObject = getStyleObject(objectId);
    if (styleObject) {
        styleObject.visibility = newVisibility;
        return true;
    } else {
        return false;
    }
}

// To use this in a link use a URL like this: javascript:confirmActionLink('You want to delete this party?', 'deleteParty?partyId=${partyId}')
function confirmActionLink(msg, newLocation) {
    if (msg == null) {
        msg = "Are you sure you want to do this?";
    }
    var agree = confirm(msg);
    if (agree) {
        if (newLocation != null) location.replace(newLocation);
    }
}

// To use this in a link use a URL like this: javascript:confirmActionFormLink('You want to update this party?', 'updateParty')
function confirmActionFormLink(msg, formName) {
    if (msg == null) {
        msg = "Are you sure you want to do this?";
    }
    var agree = confirm(msg);
    if (agree) {
        if (formName != null) document.forms[formName].submit();
    }
}

// ===== Ajax Functions - based on jQuery.js ===== //

/** Update an area (HTML container element).
  * @param areaId The id of the HTML container to update
  * @param target The URL to call to update the HTML container
  * @param targetParams The URL parameters
*/

function ajaxUpdateArea(areaId, target, targetParams) {
    waitSpinnerShow();
    jQuery.ajax({
        url: target,
        type: "POST",
        data: targetParams,
        success: function(data) {
            jQuery("#" + areaId).html(data);
            waitSpinnerHide();
        },
        error: function(data) {waitSpinnerHide()}
    });
}

/** Update multiple areas (HTML container elements).
  * @param areaCsvString The area CSV string. The CSV string is a flat array in the
  * form of: areaId, target, target parameters [, areaId, target, target parameters...].
*/
function ajaxUpdateAreas(areaCsvString) {
    waitSpinnerShow();
    var areaArray = areaCsvString.split(",");
    var numAreas = parseInt(areaArray.length / 3);
    for (var i = 0; i < numAreas * 3; i = i + 3) {
        var areaId = areaArray[i];
        var target = areaArray[i + 1];
        var targetParams = areaArray[i + 2];
        // that was done by the prototype updater internally, remove the ? and the anchor flag from the parameters
        // not nice but works
        targetParams = targetParams.replace('#','');
        targetParams = targetParams.replace('?','');
        jQuery.ajax({
            url: target,
            async: false,
            type: "POST",
            data: targetParams,
            success: function(data) {
                jQuery("#" + areaId).html(data);
                waitSpinnerHide();
            },
            error: function(data) {waitSpinnerHide()}
        });
    }
}

/** Update an area (HTML container element) periodically.
  * @param areaId The id of the HTML container to update
  * @param target The URL to call to update the HTML container
  * @param targetParams The URL parameters
  * @param interval The update interval, in seconds.
*/
function ajaxUpdateAreaPeriodic(areaId, target, targetParams, interval) {
    jQuery.fjTimer({
        interval: interval,
        repeat: true,
        tick: function(container, timerId){
            jQuery.ajax({
                url: target,
                type: "POST",
                data: targetParams,
                success: function(data) {
                    jQuery("#" + areaId).html(data);
                    waitSpinnerHide();
                },
                error: function(data) {waitSpinnerHide()}
            });
            
        }
    });
}

/** Submit request, update multiple areas (HTML container elements).
  * @param target The URL to call to update the HTML container
  * @param targetParams The URL parameters
  * @param areaCsvString The area CSV string. The CSV string is a flat array in the
  * form of: areaId, target, target parameters [, areaId, target, target parameters...].
*/
function ajaxSubmitRequestUpdateAreas(target, targetParams, areaCsvString) {
    updateFunction = function(transport) {
        ajaxUpdateAreas(areaCsvString);
    }
    jQuery.ajax({
        url: target,
        type: "POST",
        data: targetParams,
        success: updateFunction()
    });
}

/** Submit form, update an area (HTML container element).
  * @param form The form element
  * @param areaId The id of the HTML container to update
  * @param submitUrl The URL to call to update the HTML container
*/
function submitFormInBackground(form, areaId, submitUrl) {
    submitFormDisableSubmits(form);
    updateFunction = function() {
        jQuery("#" + areaId).load(submitUrl);
    }
    jQuery.ajax({
        url: jQuery(form).attr("action"),
        data: jQuery(form).serialize(),
        success: updateFunction()
    });
}

/** Submit form, update multiple areas (HTML container elements).
 * @param form The form element
 * @param areaCsvString The area CSV string. The CSV string is a flat array in the
 * form of: areaId, target, target parameters [, areaId, target, target parameters...].
*/
function ajaxSubmitFormUpdateAreas(form, areaCsvString) {
   waitSpinnerShow();
   hideErrorContainer = function() {
       jQuery('#content-messages').removeClass('errorMessage').fadeIn('fast');
   }
   updateFunction = function(data) {
       if (data._ERROR_MESSAGE_LIST_ != undefined || data._ERROR_MESSAGE_ != undefined) {
           if(!jQuery('#content-messages')) {
              //add this div just after app-navigation
              if(jQuery('#content-main-section')){
                  jQuery('#content-main-section' ).before('<div id="content-messages" onclick="hideErrorContainer()"></div>');
              }
           }
           jQuery('#content-messages').addClass('errorMessage');
          if (data._ERROR_MESSAGE_LIST_ != undefined && data._ERROR_MESSAGE_ != undefined) {
              jQuery('#content-messages' ).html(data._ERROR_MESSAGE_LIST_ + " " + data._ERROR_MESSAGE_);
          } else if (data._ERROR_MESSAGE_LIST_ != undefined) {
              jQuery('#content-messages' ).html(data._ERROR_MESSAGE_LIST_);
          } else {
              jQuery('#content-messages' ).html(data._ERROR_MESSAGE_);
          }
          jQuery('#content-messages').fadeIn('fast');
       }else {
           if(jQuery('#content-messages')) {
               jQuery('#content-messages').removeClass('errorMessage').fadeIn("fast");
           }
           ajaxUpdateAreas(areaCsvString);
       }
       waitSpinnerHide();
   }

   jQuery.ajax({
       type: "POST",
       url: jQuery("#" + form).attr("action"),
       data: jQuery("#" + form).serialize(),
       success: function(data) {
               updateFunction(data);
       }
   });
}

/** Enable auto-completion for text elements.
 * @param areaCsvString The area CSV string. The CSV string is a flat array in the
 * form of: areaId, target, target parameters [, areaId, target, target parameters...].
*/

function ajaxAutoCompleter(areaCsvString, showDescription, defaultMinLength, defaultDelay, formName){
    var areaArray = areaCsvString.replace(/&amp;/g, '&').split(",");
    var numAreas = parseInt(areaArray.length / 3);
    
    for (var i = 0; i < numAreas * 3; i = i + 3) {
        var url = areaArray[i + 1] + "?" + areaArray[i + 2];
        var div = areaArray[i];
        // create a separated div where the result JSON Opbject will be placed
        if ((jQuery("#" + div + "_auto")).length < 1) {
            jQuery("<div id='" + div + "_auto'></div>").insertBefore("#" + areaArray[i]);
        }
        
        jQuery("#" + div).autocomplete({
            minLength: defaultMinLength,
            delay: defaultDelay,
            source: function(request, response){
                jQuery.ajax({
                    url: url,
                    async: false,
                    data: {term : request.term},
                    success: function(data) {
                    	// reset the autocomp field
                    	autocomp = undefined;
                    	
                        //update the result div
                        jQuery("#" + div + "_auto").html(data);
                        if (typeof autocomp != 'undefined') {
                            jQuery.each(autocomp, function(index, item){
                                item.label = jQuery("<div>").html(item.label).text();
                            })
                            // autocomp is the JSON Object which will be used for the autocomplete box
                            response(autocomp);
                        }
                    }
                })
            },
            select: function(event, ui){
                //jQuery("#" + areaArray[0]).html(ui.item);
                jQuery("#" + areaArray[0]).val(ui.item.value); // setting a text field   
                jQuery("#" + areaArray[0]).trigger("lookup:changed"); // notify the field has changed
                if (showDescription) {
                    setLookDescription(areaArray[0], ui.item.label, areaArray[2], formName)
                }
            }
        });
        if (showDescription) {
            var lookupDescriptionLoader = new lookupDescriptionLoaded(areaArray[i], areaArray[i + 1], areaArray[i + 2], formName);
            lookupDescriptionLoader.update();
            jQuery("#" + areaArray[i]).bind('change lookup:changed', function(){
                lookupDescriptionLoader.update();
            });
        }
    }
}

function setLookDescription(textFieldId, description, params, formName){
    if (description) {
        var start = description.lastIndexOf(' [');
        if (start != -1) {
            description = description.substring(0, start);
            
            // This sets a (possibly hidden) dependent field if a description-field-name is provided  
            var dependentField = params.substring(params.indexOf("searchValueFieldName"));
            dependentField = jQuery("#" + formName + "_" + dependentField.substring(dependentField.indexOf("=") + 1));
            var dependentFieldValue = description.substring(0, description.lastIndexOf(' '))
            if (dependentField.length) {
                dependentField.val(dependentFieldValue);
                dependentField.trigger("change"); // let the 'hidden' field know its been changed
            }
        }
        var lookupWrapperEl = jQuery("#" + textFieldId).closest('.field-lookup');
        if (lookupWrapperEl.length) {
            if (start == -1) {
                var start = description.indexOf(' ');
                if (start != -1 && description.indexOf('<script type="text/javascript">') == -1) {
                    description = description.substring(start);
                }
            }
            tooltipElement = jQuery("#" + textFieldId + '_lookupDescription')
            if (!tooltipElement.length) {
                tooltipElement = jQuery("<span id='" + textFieldId + "_lookupDescription' class='tooltip'></span>");
            }
            tooltipElement.html(description);
            lookupWrapperEl.append(tooltipElement);
        }
    }
}

/** Enable auto-completion for drop-down elements.*/

function ajaxAutoCompleteDropDown() {
    jQuery.widget( "ui.combobox", {
        _create: function() {
            var self = this;
            var select = this.element.hide(),
                selected = select.children( ":selected" ),
                value = selected.val() ? selected.text() : "";
            var input = jQuery( "<input>" )
                .insertAfter( select )
                .val( value )
                .autocomplete({
                    delay: 0,
                    minLength: 0,
                    source: function( request, response ) {
                        var matcher = new RegExp( jQuery.ui.autocomplete.escapeRegex(request.term), "i" );
                        response( select.children( "option" ).map(function() {
                            var text = jQuery( this ).text();
                            if ( this.value && ( !request.term || matcher.test(text) ) )
                                return {
                                    label: text.replace(
                                        new RegExp(
                                            "(?![^&;]+;)(?!<[^<>]*)(" +
                                            jQuery.ui.autocomplete.escapeRegex(request.term) +
                                            ")(?![^<>]*>)(?![^&;]+;)", "gi"
                                        ), "<strong>$1</strong>" ),
                                    value: text,
                                    option: this
                                };
                        }) );
                    },
                    select: function( event, ui ) {
                        ui.item.option.selected = true;                        
                        //select.val( ui.item.option.value );
                        self._trigger( "selected", event, {
                            item: ui.item.option
                        });
                    },
                    change: function( event, ui ) {
                        if ( !ui.item ) {
                            var matcher = new RegExp( "^" + jQuery.ui.autocomplete.escapeRegex( jQuery(this).val() ) + "$", "i" ),
                                valid = false;
                            select.children( "option" ).each(function() {
                                if ( this.value.match( matcher ) ) {
                                    this.selected = valid = true;
                                    return false;
                                }
                            });
                            if ( !valid ) {
                                // remove invalid value, as it didn't match anything
                                jQuery( this ).val( "" );
                                select.val( "" );
                                return false;
                            }
                        }
                    }
                })
                //.addClass( "ui-widget ui-widget-content ui-corner-left" );

            input.data( "autocomplete" )._renderItem = function( ul, item ) {
                return jQuery( "<li></li>" )
                    .data( "item.autocomplete", item )
                    .append( "<a>" + item.label + "</a>" )
                    .appendTo( ul );
            };

            jQuery( "<a>&nbsp;</a>" )
                .attr( "tabIndex", -1 )
                .attr( "title", "Show All Items" )
                .insertAfter( input )
                .button({
                    icons: {
                        primary: "ui-icon-triangle-1-s"
                    },
                    text: false
                })
                .removeClass( "ui-corner-all" )
                .addClass( "ui-corner-right ui-button-icon" )
                .click(function() {
                    // close if already visible
                    if ( input.autocomplete( "widget" ).is( ":visible" ) ) {
                        input.autocomplete( "close" );
                        return;
                    }

                    // pass empty string as value to search for, displaying all results
                    input.autocomplete( "search", "" );
                    input.focus();
                });
        }
    });

}


/** Toggle area visibility on/off.
 * @param link The <a> element calling this function
 * @param areaId The id of the HTML container to toggle
 * @param expandTxt Localized 'Expand' text
 * @param collapseTxt Localized 'Collapse' text
*/
function toggleCollapsiblePanel(link, areaId, expandTxt, collapseTxt){
   var container = jQuery("#" + areaId);
   var liElement = jQuery(link).parents('li:first');
    if (liElement) {
      if (container.is(':visible')) {
        liElement.removeClass('expanded');
        liElement.addClass('collapsed');
        link.title = expandTxt;
      } else {
        liElement.removeClass('collapsed');
        liElement.addClass('expanded');
        link.title = collapseTxt;
      }
    }
   container.animate({opacity: 'toggle', height: 'toggle'}, "slow");
}

/** Toggle screenlet visibility on/off.
 * @param link The <a> element calling this function
 * @param areaId The id of the HTML container to toggle
 * @param expandTxt Localized 'Expand' text
 * @param collapseTxt Localized 'Collapse' text
*/
function toggleScreenlet(link, areaId, saveCollapsed, expandTxt, collapseTxt){
   toggleCollapsiblePanel(link, areaId, expandTxt, collapseTxt);
   var screenlet = jQuery(link).parents('div:eq(1)').attr('id');
   var title = jQuery(link).attr('title');
   if(title == expandTxt){
       var currentParam = screenlet + "_collapsed=false";
       var newParam = screenlet + "_collapsed=true";
       if(saveCollapsed=='true'){
           setUserLayoutPreferences('GLOBAL_PREFERENCES',screenlet+"_collapsed",'true');
       }
   } else {
       var currentParam = screenlet + "_collapsed=true";
       var newParam = screenlet + "_collapsed=false";
       if(saveCollapsed=='true'){
           setUserLayoutPreferences('GLOBAL_PREFERENCES',screenlet+"_collapsed",'false');
       }
   }
   var paginationMenus = jQuery('div.nav-pager');
   jQuery.each(paginationMenus, function(menu) {
       if (menu) {
           var childElements = menu.getElementsByTagName('a');
           for (var i = 0; i < childElements.length; i++) {
               if (childElements[i].href.indexOf("http") == 0) {
                   childElements[i].href = replaceQueryParam(childElements[i].href, currentParam, newParam);
               }
           }
           childElements = menu.getElementsByTagName('select');
           for (i = 0; i < childElements.length; i++) {
               if (childElements[i].href.indexOf("location.href") >= 0) {
                   Element.extend(childElements[i]);
                   childElements[i].writeAttribute("onchange", replaceQueryParam(childElements[i].readAttribute("onchange"), currentParam, newParam));
               }
           }
       }
   });
}

/** In Place Editor for display elements
  * @param element The id of the display field
  * @param url The request to be called to update the display field
  * @param options Options to be passed to Ajax.InPlaceEditor
*/

function ajaxInPlaceEditDisplayField(element, url, options) {
    var jElement = jQuery("#" + element);
    jElement.mouseover(function() {
        jQuery(this).css('background-color', 'rgb(255, 255, 153)');
    });

    jElement.mouseout(function() {
        jQuery(this).css('background-color', 'transparent');
    });

    jElement.editable(function(value, settings){
        // removes all line breaks from the value param, because the parseJSON Function can't work with line breaks
    	value = value.replace(/\n/g, " ");
    	value = value.replace(/\"/g,"&quot;");

        var resultField = jQuery.parseJSON('{"' + settings.name + '":"' + value + '"}');
        // merge both parameter objects together
        jQuery.extend(settings.submitdata, resultField);
        jQuery.ajax({
            type : settings.method,
            url : url,
            data : settings.submitdata,
            success : function(data) {
                // adding the new value to the field and make the modified field 'blink' a little bit to show the user that somethink have changed
                jElement.html(value).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).css('background-color', 'transparent');
            }
        });
    }, options);
}

// ===== End of Ajax Functions ===== //

function replaceQueryParam(queryString, currentParam, newParam) {
    var result = queryString.replace(currentParam, newParam);
    if (result.indexOf(newParam) < 0) {
        if (result.indexOf("?") < 0) {
            result = result + "?" + newParam;
        } else if (result.endsWith("#")) {
            result = result.replace("#", "&" + newParam + "#");
        } else if (result.endsWith(";")) {
            result = result.replace(";", " + '&" + newParam + "';");
        } else {
            result = result + "&" + newParam;
        }
    }
    return result;
}

function submitFormDisableSubmits(form) {
    for (var i=0;i<form.length;i++) {
        var formel = form.elements[i];
        if (formel.type == "submit") {
            submitFormDisableButton(formel);
            var formName = form.name;
            var formelName = formel.name;
            var timeoutString = "submitFormEnableButtonByName('" + formName + "', '" + formelName + "')";
            var t = setTimeout(timeoutString, 1500);
        }
    }
}

// prevents doubleposts for <submit> inputs of type "button" or "image"
function submitFormDisableButton(button) {
    if (button.form.action != null && button.form.action.length) {
        button.disabled = true;
    }
    button.className = button.className + " disabled";
    button.value = button.value + "*";
}

function submitFormEnableButtonByName(formName, buttonName) {
    var form = document[formName];
    var button = form.elements[buttonName];
    submitFormEnableButton(button);
}
function submitFormEnableButton(button) {
    button.disabled = false;
    button.className = button.className.substring(0, button.className.length - " disabled".length);
    button.value = button.value.substring(0, button.value.length - 1);
}

function expandAll(expanded) {
  var divs,divs1,i,j,links,groupbody;

  divs=document.getElementsByTagName('div');
  for(i=0;i<divs.length;i++) {
    if(/fieldgroup$/.test(divs[i].className)) {
      links=divs[i].getElementsByTagName('a');
      if(links.length>0) {
        divs1=divs[i].getElementsByTagName('div');
        for(j=0;j<divs1.length;j++){
          if(/fieldgroup-body/.test(divs1[j].className)) {
            groupbody=divs1[j];
          }
        }
        if(jQuery(groupbody).is(':visible') != expanded) {
          toggleCollapsiblePanel(links[0], groupbody.id, 'expand', 'collapse');
        }
      }
    }
  }
}

//calls ajax request for storing user layout preferences
function setUserLayoutPreferences(userPrefGroupTypeId, userPrefTypeId, userPrefValue){
    jQuery.ajax({
        url:'ajaxSetUserPreference',
        type: "POST",
        data: ({userPrefGroupTypeId: userPrefGroupTypeId, userPrefTypeId: userPrefTypeId, userPrefValue: userPrefValue}),
        success: function(data) {}
    });
}

function waitSpinnerShow() {
    jSpinner = jQuery("#wait-spinner");
    if (!jSpinner.length) return

    bdy = document.body;
    lookupLeft = (bdy.offsetWidth / 2) - (jSpinner.width() / 2);
    scrollOffY = jQuery(window).scrollTop();
    winHeight = jQuery(window).height();
    lookupTop = (scrollOffY + winHeight / 2) - (jSpinner.height() / 2);

    jSpinner.css("display", "block");
    jSpinner.css("left", lookupLeft + "px"); 
    jSpinner.css("top", lookupTop + "px");
    jSpinner.show();
}

function waitSpinnerHide() {
    jQuery("#wait-spinner").hide()
}

/**
 * Reads the requiered uiLabels from the uiLabelXml Files
 * @param requiredLabels JSON Object {resource : [label1, label2 ...], resource2 : [label1, label2, ...]}
 * @return JSON Object
 */
function getJSONuiLabels(requiredLabels) {
    var returnVal = {};
    var requiredLabelsStr = JSON.stringify(requiredLabels)

    if (requiredLabels != null && requiredLabels != "") {
        jQuery.ajax({
            url: "getJSONuiLabelArray",
            type: "POST",
            data: {"requiredLabels" : requiredLabelsStr},
            async: false,
            success: function(data) {
                returnVal = data;
            }
        });
    }

    return returnVal;
}

/**
 * Read the requiered uiLabel from the uiLabelXml Resource
 * @param uiResource String
 * @param errUiLabel String
 * @returns String with Label
 */
function getJSONuiLabel(uiResource, errUiLabel) {
    requiredLabel = {};
    requiredLabel[uiResource] = errUiLabel;

    var returnVal = "";
    var requiredLabelStr = JSON.stringify(requiredLabel)

    if (requiredLabel != null && requiredLabel != "") {
        jQuery.ajax({
            url: "getJSONuiLabel",
            type: "POST",
            data: {"requiredLabel" : requiredLabelStr},
            async: false,
            success: function(data) {
                returnVal = data[0];
            }
        });
    }
    return returnVal;
}

/**
 * Opens an alert alert box with an i18n error message
 * @param errBoxTitleResource String - Can be empty
 * @param errBoxTitleLabel String - Can be empty
 * @param uiResource String - Required
 * @param errUiLabel String - Required
 */
function showErrorAlertLoadUiLabel(errBoxTitleResource, errBoxTitleLabel, uiResource, errUiLabel) {
    if (uiResource == null || uiResource == "" || uiResource == undefined || errUiLabel == null || errUiLabel == "" || errUiLabel == undefined) {
        // No Label Information are set, Error Msg Box can't be created
        return;
    }

    var labels = {};
    var useTitle = false;
    // title can only be set when the resource and the label are set
    if (errBoxTitleResource != null && errBoxTitleResource != "" && errBoxTitleLabel != null && errBoxTitleLabel != "") {
        // create the JSON Object
        if (errBoxTitleResource == uiResource) {
            labels[errBoxTitleResource] = [errBoxTitleLabel, errUiLabel];
        } else {
            labels[errBoxTitleResource] = [errBoxTitleLabel];
            labels[uiResource] = [errUiLabel];
        }
        useTitle = true;
    } else {
        labels[uiResource] = [errUiLabel];
    }
    // request the labels
    labels = getJSONuiLabels(labels);

    var errMsgBox = jQuery("#contentarea").after(jQuery("<div id='errorAlertBox'></div>"));

    if (errMsgBox.length) {
        errMsgBox.dialog({
            modal: true,
            title: function() {
                if (useTitle) {
                    return labels[errBoxTitleResource][0]
                } else {
                    return ""
                }
            },
            open : function() {
                var positionInArray = 0;
                if (errBoxTitleResource == uiResource) {
                    positionInArray = 1;
                }
                errMsgBox.html(labels[uiResource][positionInArray]);
            },
            buttons: {
                Ok: function() {
                    errMsgBox.remove();
                    jQuery( this ).dialog( "close" );
                }
            }
        });
    }
}

/**
 * Opens an alert alert box. This function is for a direct call from the ftl files where you can direcetly resolve youre labels
 * @param errBoxTitle String - Can be empty
 * @param errMessage String - Required - i18n Error Message
 */
function showErrorAlert(errBoxTitle, errMessage) {
    if (errMessage == null || errMessage == "" || errMessage == undefined ) {
        // No Error Message Information is set, Error Msg Box can't be created
        return;
    }

    var errMsgBox = jQuery("#contentarea").after(jQuery("<div id='errorAlertBox'>" + errMessage + "</div>"));

    if (errMsgBox.length) {
        errMsgBox.dialog({
            modal: true,
            title: errBoxTitle,
            buttons: {
                Ok: function() {
                    errMsgBox.remove();
                    jQuery( this ).dialog( "close" );
                }
            }
        });
    }
}