# Pixel Slate - Etch-a-sketch

## About
Pixel Slate, an etch-a-sketch web app. Draw art in a pixel canvas.

## Motivation
First, this personal portfolio project encouraged me to practice writing clean code. To follow conventions such as, assigning variables with readable and understandable names, and having coherent spacing and indentions. And giving descriptive names to function according to how they work. I also decided to consistently add semicolons to my JS code.

Then, practice the usage of comments to describe parts of the code to help readability in the long run of the development. Such that, as the code base becomes larger, it was helpful to have comments guiding and reminding me how my code works.

Next, the project deals with multiple values and repeating data wherein arrays and loops are useful in organizing and computing said values. I have harnessed the ability of arrays and loops to execute solutions to rather complex problems.  

Finally, the project showcases my skill in more DOM manipulation by providing interactivity to this etch-a-sketch project.

## Manual
1. The canvas opens in a default 16 x 16 pixels pad size and black color in 'Paint' mode.

2. The user can click and drag in the canvas to paint over the pixels.

3. The user can switch color either by clicking the pre-selected swatch colors, or by selecting a color from the color picker. If the user selects a color from the picker, the color is saved in a palette.

4. The user can switch to "Eraser" tool that erase colored pixels in the canvas.

5. The "Color Fill" tool fills pixels bounded inside painted pixels. The color fill tool is executed simply by clicking an origin point for propagation. 

6. The "Rainbow" tool colors pixels in random colors from the rainbow swatches.

7. "Clear" tool erases the whole canvas from color, resetting it into a clean slate.

8. The user can adjust the pad size from 8 to 100 squared pixel units, either by dragging the meter or by typing through a prompt. Note that changing pad size will clear the canvas.

## Dev Notes
The page loads with default properties set in variables, specifically the default dimensions (pad size), colorPicked (current color), and modeFlagsArray filled with mode objects with paintMode as its default active mode.


### Canvas
A default 16 x 16 pixel canvas is loaded to the page. This is added in the DOM by **addPad** function that receives a dimension argument, which is further executed when the user decides to change the pad size.

The user can either change pad size through a slider or range input or typing a value via prompt, executed by **slideForPadSize** and **typeForPadSize** respectively.

The dimensions allowed for change, ranges from 8 to 100 squared pixel units. If a size changed is executed via prompt with less than 8 or more that 100, the prompt will ask the user again for a valid number in range.

When the pad size is changed, the script removes the canvas from the DOM using **removePad** function. Then, execute **addPad** with the new dimension to add new canvas DOM element while a new set of eventListener is added to the pixels respective to the current active mode.

### Colors
A **BasicSwatch** object constructor creates pre-made specific color swatches. These colors are stored in the *swatchColors* array. These basic swatch colors are readily displayed in the DOM for selection with eventListener **getColorFromSwatch** which updates the selected color.

Picking a color from the picker executes **getColorFromPicker** function which updates selected color, while filling a new color to an empty swatch allocated for user specified colors. Up to 10 empty swatches are available to be filled. If the user has already filled all empty swatches, the new color picked will be placed in the last, while the oldest color picked will be removed from the swatch history.

In **getColorFromSwatch** and **getColorFromPicker** functions, while 'Rainbow' mode is currently active, if the user pick a color, the mode switches to 'Paint Mode'.
Meanwhile, if 'Eraser' mode is active, switching color will turn off any active mode, which allow the user to pick their next move, i.e. 'Paint' or 'Fill'.

### Tools
The modeFlagArray consists of the mode objects created though an object constructor. For example:
```
let paintMode = new ModeFlag("paintMode", true);
```
It will produce an object {mode: 'paintMode', status: true} pushed to the modeFlagArray. This array is mainly used to toggle between the different tools of the webapp.

Painting the canvas works by adding eventListeners to the pixels, which detects mouse events.

The 'Paint' tool allows the user to paint the canvas with selected color either by clicking a pixel or by click and dragging the cursor over the canvas. 

While the 'Rainbow' tool practically work the same way as 'Paint', the color it paints randomize from a set of colors on every pixel. 

The 'Eraser' tool works by simply setting the *colorPicked* variable to empty string, which satisfies a conditional in the *paint* function to clear the background color then assigning a color dataset on the selected pixels.

Painting a pixel is scripted to only work with actions from the left mouse key. In addition, if the user drags the cursor outside the canvas, it will continually work when the user go back to the canvas given that the user has not yet released the mouse click, otherwise the dragging function is cancelled. 

 The 'Clear' tool simply removes the background color and color dataset associated to the pixels in the canvas. It also turns off all modes and remove any eventListeners to the pixels. This prompts users to click their next move.

 The 'Color Fill' tool is a special feature I added to the project. With selecting a color and clicking on an origin point, it fills the pixels bounded by dissimilar color/s.
 This works by:
 1. When an origin point is clicked, it gets the element's color dataset as reference for *original color*.

 2. The origin point will then identify its coordinates by getting its row and column datasets.

 3. A for loop is executed respective to the number of pixels in the canvas. A **propagate** function is executed on each iteration to fill out the bounded pixels.

 4. The origin point will be styled with a new color and a new *origin* dataset attribute will be assigned to the pixel.

 5. The script then identify its adjacent pixels. If the pixel has already been assign as *origin* or is not of the same *original color*, it will skip the pixel, otherwise a *fillPoint* dataset is assigned to the adjacent pixel while painting it with the new color. Note that if the coordinates of adjacent pixel is invalid the script handles it by cancelling the propagation for this coordinates to avoid error.

 6. The loop will then set the *fillPoint* pixels as new *origin* pixels to continue propagation while coloring bounded pixels. The loop breaks when there are no more new *fillPoint* pixels to set as new *origin* pixel for propagation.

 7. Finally, when all pixels to be filled are painted, the assigned *origin* datasets are removed from the pixels. Awaiting for its next color fill.

 # Live Preview
 This webapp is available in [sketch](https://makieldeviso.github.io/sketch/)