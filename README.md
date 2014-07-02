ellipsis
========

A jQuery plugin for appending an ellipsis to text blocks

This plugin differs from other ellipsis plugins as it uses the container height property to 
shorten text.  

## Usage
```
$("#shorten").ellipsis();
```

## You may also override the text display:

```
$("#shorten").ellipsis({ ellipsis_text: '<span>***</span>' });
```

The element you want to shorten must have a container set to an explicit height
and the text overflow set to hidden.  

Example:

```
<html>
  <head>
    <style>
      
      div#test {
        border: 1px solid black; height: 100px; width: 250px;
        overflow: hidden;
      }

      div#test div.title { color: red; }
    </style>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js" />
    <script src="https://raw.github.com/joeo73/ellipsis/master/build/jquery.ellipsis.min.js"/>
  </head>
  <body>
    <div id="test">
      <div class="title"><span>Bushwick keffiyeh: egan tattooed. Deep v tote</span></div>
      <div class="shorten"><span>
        Hashtag Portland Echo <b>four eep v tote bag master cleanse ethical chia.
        Church-key fashion axe mustache trust fund, American Apparel distillery drinking vinegar meh.
        Sartorial brunch bicycle rights</b>, Blue Bottle irony ethical mustache Pinterest roof party.
        Bushwick vegan tattooed. Deep v tote bag master cleanse ethical chia.
        Church-key fashion axe mustache trust fund, American Apparel distillery drinking vinegar meh.
        Sartorial brunch bicycle rights,  loko cliche skateboard Wes Anderson organic trust fund art party pour-over.
        Biodiesel Intelligentsia chillwave drinking vinegar, dreamcatcher iPhone blog ennui
        mixtape Pitchfork leggings. Vegan kogi brunch, Tonx Schlitz Odd Future try-hard.</span>
      </div>
    </div>
  </body>
</html>
```


## Getting started:

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/joeo73/ellipsis/master/build/jquery.ellipsis.min.js
[max]: https://raw.github.com/joeo73/ellipsis/master/src/jquery.ellipsis.js



