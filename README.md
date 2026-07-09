# Jousting Knights

a.k.a. **Amazing Chessboard Patterns**

<img src="./gallery/knight-knight-250_000.png" width="150" height="150" alt="Red & Black Knights Pattern"></img>

This is an interactive web application for generating chessboard patterns based on the Numberphile videos _[Red & Black Knights (extraordinary result)](https://www.youtube.com/watch?v=UiX4CFIiegM)_ and _[Amazing Chessboard Patterns (extra)](https://www.youtube.com/watch?v=VgmDuBCayPw)_.

The pattern generation rule in a nutshell:

* Fill an oversized chessboard with knights (or generalized [fairy chess pieces](https://en.wikipedia.org/wiki/Fairy_chess_piece)) of one or more opposing armies.
* Start at the center and spiral outwards.
* Skip any square that is threatened by an enemy piece.

This produces incredible patterns, especially when using multiple piece types. See the _Gallery_ below for examples.

In addition to the piece types presented in the videos, this app also features _camels_, _giraffes_, and _stags_.

## Try it out now

Live version: [https://thomas-rosenau.de/jousting-knights](https://thomas-rosenau.de/jousting-knights)

## Usage

* Enter a list of chess pieces in the _Army_ field, separated by spaces or commas.
  Choose a color palette you like and enter it in the _Color palette_ field.
  Note that you need one more color than the number of pieces to account for empty squares.
* Alternatively, pick one of the examples at the bottom or click the _Random_ button!
* Use the provided sliders to control the board size and animation rate.
* The application will draw the resulting pattern.
* You can save the generated image using the save button at the bottom of the page.

## How to install

It's all static files, no build required. Just copy all files in the base folder to a web server.

## Gallery

<div align="center"><img src="./gallery/knight-knight-250_000.png" width="500" height="500" alt="Red &amp; Black Knights Pattern"><br>Red &amp; Black Knights<br>
<a href="./gallery/knight-knight-250_000.png">Full image</a><br>
<a href="https://thomas-rosenau.de/jousting-knights/#palette=white+red+black&army=knight+knight">Interactive version</a>
</div><hr/>

<div align="center"><img src="./gallery/dabbaba-wazir-zebra-250_000.png" width="500" height="500" alt="Red Dabbaba, Yellow Wazir, Black Zebra Pattern"><br>Red Dabbaba, Yellow Wazir, Black Zebra<br>
<a href="./gallery/dabbaba-wazir-zebra-250_000.png">Full image</a><br>
<a href="https://thomas-rosenau.de/jousting-knights/#palette=white+red+gold+black&army=dabbaba+wazir+zebra">Interactive version</a>
</div><hr/>

<div align="center"><img src="./gallery/giraffe-dromedary-camel-100_000_000-scaled.png" width="500" height="500" alt="Red Giraffe, Green Dromedary, Blue Camel Pattern"><br>Red Giraffe, Green Dromedary, Blue Camel<br><br>
<img src="./gallery/giraffe-dromedary-camel-100_000_000-cut.png" width="500" height="500" alt="Red Giraffe, Green Dromedary, Blue Camel Pattern Detail"><br>Detail<br><br>
<a href="./gallery/giraffe-dromedary-camel-100_000_000.png">Full image</a><br>
<a href="https://thomas-rosenau.de/jousting-knights/#palette=white+red+lime+blue&army=giraffe+dromedary+camel&boardSize=6">Interactive version</a>

</div><hr/>

<div align="center"><img src="./gallery/antelope-wazir-dabbaba-dabbaba-16_000_000-scaled.png" width="500" height="500" alt="Yellow Antelope, Green Wazir, Pink &amp; Orange Dabbabas Pattern"><br>Yellow Antelope, Green Wazir, Pink &amp; Orange Dabbabas<br>
<a href="./gallery/antelope-wazir-dabbaba-dabbaba-16_000_000.png">Full image</a><br>
<a href="https://thomas-rosenau.de/jousting-knights/#palette=white+yellow+green+pink+orange&army=antelope+wazir+dabbaba+dabbaba&boardSize=5">Interactive version</a>

</div><hr/>

<div align="center"><img src="./gallery/antelope-zebra-zebra-camel-250_000.png" width="500" height="500" alt="Red Antelope, Black &amp; Blue Zebras, Yellow Camel Pattern"><br>Red Antelope, Black &amp; Blue Zebras, Yellow Camel<br>
<a href="./gallery/antelope-zebra-zebra-camel-250_000.png">Full image</a><br>
<a href="https://thomas-rosenau.de/jousting-knights/#palette=white+red+black+blue+gold&army=antelope+zebra+zebra+camel">Interactive version</a>

</div><hr/>

<div align="center"><img src="./gallery/camel-zebra-stag-100_000_000-scaled.png" width="500" height="500" alt="Green Camel, Red Zebra, Black Stag Pattern"><br>Green Camel, Red Zebra, Black Stag<br>
<a href="./gallery/camel-zebra-stag-100_000_000.png">Full image</a><br>
<a href="https://thomas-rosenau.de/jousting-knights/#palette=white+lime+red+black&army=camel+zebra+stag&boardSize=6">Interactive version</a>

</div><hr/>

<div align="center"><img src="./gallery/dromedary-alfil-knight-wazir-100_000_000-scaled.2.png" width="500" height="500" alt="Red Dromedary, Blue Alfil, Yellow Knight, Green Wazir Pattern"><br>Red Dromedary, Blue Alfil, Yellow Knight, Green Wazir<br><br>
<img src="./gallery/dromedary-alfil-knight-wazir-100_000_000-cut.png" width="500" height="500" alt="Red Dromedary, Blue Alfil, Yellow Knight, Green Wazir Pattern Detail"><br>Detail<br><br>
<a href="./gallery/dromedary-alfil-knight-wazir-100_000_000.png">Full image</a><br>
<a href="https://thomas-rosenau.de/jousting-knights/#palette=white+red+blue+gold+lime+lime&army=dromedary+alfil+knight+wazir&boardSize=5">Interactive version</a>

</div><hr/>

<div align="center"><img src="./gallery/dromedary-dromedary-knight-antelope-alfil-16_000_000-scaled.png" width="500" height="500" alt="Red &amp; Blue Dromedaries, Yellow Knight, Green Antelope, Orange Alfil Pattern"><br>Red &amp; Blue Dromedaries, Yellow Knight, Green Antelope, Orange Alfil<br>
<a href="./gallery/dromedary-dromedary-knight-antelope-alfil-16_000_000.png">Full image</a><br>
<a href="https://thomas-rosenau.de/jousting-knights/#palette=white+red+blue+gold+green+orange&army=dromedary+dromedary+knight+antelope+alfil&boardSize=5">Interactive version</a>

</div><hr/>

<div align="center"><img src="./gallery/alfil-dromedary-dabbaba-100_000_000-scaled.png" width="500" height="500" alt="Red Alfil, Cyan Dromedary, Yellow Dabbaba Pattern"><br>Red Alfil, Cyan Dromedary, Yellow Dabbaba<br><br>
<img src="./gallery/alfil-dromedary-dabbaba-100_000_000-cut-scaled.png" width="500" height="500" alt="Red Alfil, Cyan Dromedary, Yellow Dabbaba Pattern Detail"><br>Detail<br><br>
<a href="./gallery/alfil-dromedary-dabbaba-100_000_000.png">Full image (⚠️️ 21MB file)</a><br>
<a href="https://thomas-rosenau.de/jousting-knights/#palette=black+red+cyan+yellow&army=alfil+dromedary+dabbaba">Interactive version</a>

</div>

## License

[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)
