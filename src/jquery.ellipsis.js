(function($) {

  /**
   * Drop words until the element selected fits within it's container and then append an ellipsis
   *
   * @param topElement the very top element being worked on
   * @param parts the components currently being worked on
   */
  var ellipsis_recurse = function(topElement, parts) {
    var ellipsis_added = false;

    //traverse from the last element up
    //for(var a = 0; a < elements.length; a++) {
    for(var a = parts.length - 1; a > -1; a--) {
      var element = parts[a];

      //ellipsis added, no need to keep going
      if(ellipsis_added) {
        break;
      }

      //If this is a text node, work on it, otherwise recurse
      //http://www.w3schools.com/jsref/prop_node_nodetype.asp
      if(element.nodeType != 3) {
        ellipsis_added = ellipsis_recurse(topElement, $(element).contents());

        if(ellipsis_added) {
          //ellipsis added, no need to keep looping
          break;
        }
      } else {
        var words = $(element).text().split(" ");

        while(ellipsis_added == false && words.length > 0) {
          //Keep popping words until things fit, or the length is zero
          //Could get a performance increase by doing this by halves instead of one by one?
          words.pop();

          $(element).text(function() {
            this.nodeValue = words.join(" ");
          });

          //If all words have been popped that need to be, append the new node for the ellipsis
          if(topElement.scrollHeight <= topElement.clientHeight) {
//            console.log('Appending ellipsis after:');
//            console.log(element);
//            console.log(element.nodeValue.trim().length);

            //We've emptied out the current element, we'll prepend the ellipsis
            //if(element.nodeValue.trim().length == 0) {
            //  $(element).parent().parent().before($.fn.ellipsis.settings.ellipsis_text);
            //} else {
            var ellipsis = $($.fn.ellipsis.settings.ellipsis_text).uniqueId();
            $(element).after(ellipsis);

//            console.log('Added Ellipsis (inner loop): ' + ellipsis.attr('id'));

            ellipsis_added = true;

            //The new text has introduced a line break, pop more words!
            while(topElement.scrollHeight > topElement.clientHeight) {
              if(words.length > 0) {
                words.pop();

                $(element).text(function() {
                  this.nodeValue = words.join(" ");
                });
              } else {
                //No more words to pop. Remove the element, pass through and add the ellipsis someplace else
  //              console.log("Removing: " + ellipsis.attr('id'));
                $('#' + ellipsis.attr('id')).remove();
                ellipsis_added = false;
              }
            }
          }
        }
      }
    }

    return ellipsis_added;
  }

  /**
   * Drop words until the element selected fits within it's container and then append an ellipsis
   */
  $.fn.ellipsis = function(options) {
    $.fn.ellipsis.settings = $.extend({}, $.fn.ellipsis.settings, options);
    ellipsis_recurse(this[0], $(this).contents());
    return this;
  };

  $.fn.ellipsis.settings = {
    ellipsis_text : '<span>...</span>'
  };

})(jQuery);