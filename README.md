<h1 align="center">
    Simple Vanilla Number Roller
</h1>

<p align="center">
    <img src="simple-vanilla-number-roller.gif" alt="Simple Vanilla Number Roller">
</p>

## Features

- It's a vanilla javascript number roller with minimal configuration;
- It's fully configurable;
- It just works.

## Quick start

Just copy the `dist/simple-vanilla-number-roller.min.js` file somewhere on your website, then add this `HTML` code to your webpage:

```html
<p>Since <span id="roller"></span></p>

<script src="simple-vanilla-number-roller.min.js"></script>

<script>
    const el = document.getElementById('roller');

    const options = {
        autoStartDelay: 2000,
        countFrom: new Date().getFullYear(),
        countTo: 1990,
        speedFrom: 500,
        speedTo: 200,
    };

    const roller = new SimpleVanillaNumberRoller(el, options);

    window.simpleVanillaNumberRoller = roller;
</script>
```

## API

```javascript
// Get the div element that contains the slides.
const rollerElement = document.getElementById('roller');

// Configurable parameters, see below.
const config = {
  countFrom: 50,
  countTo: 0,
  onCompleted: () => console.log('done...'),
};

// Instanciate a new Simple Slider.
const roller = new SimpleVanillaNumberRoller(rollerElement, config);
```

```javascript
// Start or restart the roller.
roller.start();

// Stop the roller
roller.stop();
```

## Default configuration

```javascript
{
    autoStart: true,       // Start the roller automatically.
                           // Default is true.

    autoStartDelay: 0,     // Delay before autostart.
                           // Default is 0ms.

    countFrom: 100,        // Begin counting from this value.
                           // Default is 100.

    countTo: 0,            // Count up to this value.
                           // Default is 0.

    onCompleted: () => {}, // Callback function when the roller as completed.
                           // Defaults is a dumb callback () => {}.

    speedFrom: 100,        // Start with transition speed.
                           // Default is 100ms.

    speedTo: 50,           // Transition speed toward the end.
                           // Default is 50ms.
}
```

## Show your appreciation / Support the author

If you like [Simple Vanilla Number Roller](https://github.com/chuot/simple-vanilla-number-roller) please consider **starring the repository** to show you appreciation to the author for his hard work. It cost nothing but is really appreciated.

If you use [Simple Vanilla Number Roller](https://github.com/chuot/simple-vanilla-number-roller) for commercial purposes or derive income from it, please consider [sponsoring this project](https://github.com/sponsors/chuot) to help support continued development.
