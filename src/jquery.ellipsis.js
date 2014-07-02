/**
 * Author Joe Osowski
 */
(function($) {

  /**
   * Drop words until the element selected fits within it's container and then append an ellipsis
   *
   * @param topElement the very top element being worked on
   * @param parts the elements currently being worked on
   */
  var ellipsis_recurse = function(topElement, parts) {
    var ellipsis_added = false;

    //traverse from the last element up
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

            console.log('ellipsis-' + $.fn.ellipsis.idCounter++);
            var ellipsis = $($.fn.ellipsis.settings.ellipsis_text).attr('id', 'ellipsis-' + $.fn.ellipsis.idCounter++);
            $(element).after(ellipsis);
            ellipsis_added = true;

            //The new text has introduced a line break, pop more words!
            while(topElement.scrollHeight > topElement.clientHeight) {
              if(words.length > 0) {
                words.pop();

                $(element).text(function() {
                  this.nodeValue = words.join(" ");
                });
              } else {
                console.log('here');
                //No more words to pop. Remove the element, pass through and add the ellipsis someplace else
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

  $.fn.ellipsis.idCounter = 0;

  $.fn.ellipsis.settings = {
    ellipsis_text : '<span>...</span>'
  };

})(jQuery);
