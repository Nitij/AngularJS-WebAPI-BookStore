;
(function (jQuery, w) {
    var $ = jQuery;
    var toolTipJS = function () {
        //***Summary***
        //array to hold tooltip location preferences
        //*************
        this.locationPreference = [];

        //***Summary***
        //Location object to be added to the location preference list
        //*************
        this.tooltipLocation = function (location, className) {
            this.location = location;
            this.className = className;
        };

        //***Summary***
        //tooltip location constants
        //*************
        this.LocationConstants = {
            Top: 1,
            Left: 2,
            Right: 3,
            Bottom: 4
        };

        //***Summary***
        //Add a location preference
        //*************
        this.addLocationPreference = function (l) {
            this.locationPreference.push(l);
        };

        //***Summary***
        //Resets location preferences
        //*************
        this.resetLocationPreference = function() {
            this.locationPreference = [];
        }

        //***Summary***
        //Flag to check if the mouse pointer is inside the source element
        //*************
        this.inside = false;

        //***Summary***
        //applies the tooltip show and hide functions on the mouseover and
        //mouseout events of the source control
        //***Params****
        //sourceControlId = ID of source control.
        //content = Tooltip content.
        //distance = Distance between the tooltip and the source control.
        //*************
        this.applyTooltip = function (toolTipId, content, distance, showAtPointer) {
            var divToolTip = null;
            var showTooltipDelegate = null;
            var hideTooltipDelegate = null;
            var sourceControl = $("*[tooltipid='" + toolTipId + "']");
            var params = null;
            divToolTip = $("#divToolTip");

            //create our tooltip div if not already present
            if (!(divToolTip.length > 0)) {
                divToolTip = document.createElement("div");
                divToolTip.setAttribute("id", "divToolTip");
                $("body").append(divToolTip);
                divToolTip = $("#divToolTip");
                divToolTip.css("position", "absolute");
                divToolTip.css("display", "none");
            }

            //delegate to change the calling context to our toolTipJS object
            showTooltipDelegate = $.proxy(showToolTip, this);
            hideTooltipDelegate = $.proxy(hideTooltip, this);
            params = {
                "sourceControl": sourceControl,
                "content": content,
                "distance": distance,
                "showAtPointer": showAtPointer
            }

            if (showAtPointer === false) {
                sourceControl.mouseover(params, showTooltipDelegate);
            }
            else {
                sourceControl.mousemove(params, showTooltipDelegate);
            }            

            sourceControl.mouseout(hideTooltipDelegate);
        };
    };

    //***Summary***
    //show the tooltip after computing the position and the correct style to apply on
    //the tooltip div.
    //*************
    function showToolTip(e) {
        var i = 0;
        var showAtPointer = e.data.showAtPointer;
        var sourceControl = e.data.sourceControl;
        var content = e.data.content;
        var targetLeft = null, targetTop = null; //top and left of the tooltip div
        var top = sourceControl.offset().top;
        var left = sourceControl.offset().left;
        var right = sourceControl.offset().left + sourceControl.outerWidth();
        var bottom = sourceControl.offset().top + sourceControl.outerHeight();        
        var divToolTip = $("#divToolTip");
        var distance = e.data.distance;

        if (showAtPointer === true) {
            left = right = e.pageX;
            top = bottom = e.pageY;
        }

        divToolTip.removeClass(); //remove any previous class
        //reset top and left
        if (this.inside === false) {
            divToolTip.css("top", 0);
            divToolTip.css("left", 0);
        }
        divToolTip.html(content); //set the tooltip content
        for (; i < this.locationPreference.length; i++) {
            switch (this.locationPreference[i].location) {
                case this.LocationConstants.Top:
                    if (divToolTip.outerHeight() + distance > top) {
                        continue;
                    }
                    else {
                        //need to set the css here so as to retrieve final height after applying css
                        divToolTip.addClass(this.locationPreference[i].className);
                        targetLeft = left;
                        //we need to set css left here to correctly compute the tooltip div height
                        divToolTip.css("left", targetLeft);
                        targetTop = top - divToolTip.outerHeight() - distance;
                    }
                    break;
                case this.LocationConstants.Right:
                    if ((divToolTip.outerWidth() + distance) > ($(window).width() - right)) {
                        continue;
                    }
                    else {
                        divToolTip.addClass(this.locationPreference[i].className);
                        targetLeft = right + distance;
                        targetTop = top;
                    }
                    break;
                case this.LocationConstants.Left:
                    if (divToolTip.outerWidth() + distance > left) {
                        continue;
                    }
                    else {
                        //need to set the css here so as to retrieve final width after applying css
                        divToolTip.addClass(this.locationPreference[i].className);
                        targetLeft = left - divToolTip.outerWidth() - distance;
                        targetTop = top;
                    }
                    break;
                case this.LocationConstants.Bottom:
                    if (divToolTip.outerHeight() + distance > $(window).height() - bottom) {
                        continue;
                    }
                    else {
                        divToolTip.addClass(this.locationPreference[i].className);
                        targetLeft = left;
                        targetTop = bottom + distance;
                    }
                    break;
            }
            
            break;
        }
        //apply the top and left for the tooltip div
        divToolTip.css("top", targetTop);
        divToolTip.css("left", targetLeft);
        if (this.inside === false) {
            divToolTip.css("display", "block");
            this.inside = true;
        }        
    };

    //***Summary***
    //hides the toooltip div.
    //*************
    function hideTooltip() {
        this.inside = false;
        $("#divToolTip").css("display", "none");
    };
    
    w["ToolTipJS"] = toolTipJS;
})($, window);