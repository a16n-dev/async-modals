[![npm](https://img.shields.io/npm/v/async-modals)](https://www.npmjs.com/package/async-modals)
[![Types](https://img.shields.io/npm/types/async-modals.svg)](https://www.npmjs.com/package/async-modals)
[![Downloads](https://img.shields.io/npm/dt/async-modals.svg)](https://www.npmjs.com/package/async-modals)
# Async Modals

A hook-based way of showing modals in React using promises designed to abstract away the complexity of modal windows.

Interested in contributing to async-modals? Please read the section below on [Contributing](#contributing)

Table of Contents
* [Quick Start](#start)
* [Examples](#examples)
* [Usage](#usage)
  * [Options](#options)
  * [Creating a modal component](#modal)
  * [ModalProvider](#modalProvider)
  * [useModal](#useModal)
* [Contributing](#contributing)

<h1 id="start">Quick Start</h1>

To use async-modals install it via npm or yarn
```
yarn add async-modals
```

Then you can start using it:

Wrap your app in the ModalProvider Component and import the styles
```tsx
import React from 'react';
import {ModalProvider} from 'async-modals';
import 'async-modals/dist/style.css';

const App: React.FC = () => {
  return (
    <ModalProvider>
      ...
    </ModalProvider>
  )
}
```

Define a modal component
```js
import React from 'react';

const AlertModal = ({data, submit}) => {
  return (
    <div>
      Alert! {data.message}
      <button onClick={() => submit()}>Dismiss</button>
    </div>
  )
}
```

Use the modal anywhere
```tsx
import React from 'react';
import {useModal} from 'async-modals'
import AlertModal from './AlertModal'

const Page: React.FC = () => {

  const alertModal = useModal(AlertModal);

  const handleClick = async () => {
    //show the modal to the user
    await alertModal.show({
      data: {
        message: 'This is an alert message'
      }
    });
  }

  return (
    <div>
      <button onClick={() => handleClick()}>Show Alert</button>
    </div>
  )
}
```

<h1 id="examples">Examples</h1>
For a set of examples covering common use cases and functionality, see <a href="https://github.com/alexn400/async-modals/tree/main/examples">examples here</a>

<h1 id="usage">Usage</h1>
<h2 id="options">Options</h2>
These are the options availabe to pass to either `ModalProvider` or `useModal`. You may change the default values of any of these options by passing them to the `defaultSettings` prop of the modal provider

| Option                  | Type                                    | Description                                                                                                                                                                                |
|-------------------------|-----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `canClose`              | `boolean`                               | If `true`, the user can click on the background to close the modal. Set to `true` by default                                                                                               |
| `showBg`                | `boolean`                               | Show a semi-transparent background behind the modal (see also `cssBgOpacity`). Set to `true` by default                                                                                    |
| `allowContentScrolling` | `boolean`                               | Allow the user to scroll the content of the page while the modal is open. Set to `false` by default                                                                                        |
| `animated`              | `boolean`                               | Set this to true if you want to use animations or transitions (see animation section for more info)                                                                                        |
| `containerClassName`    | `string`                                | classes to apply to the modal container.                                                                                                                                                   |
| `backgroundClassName`   | `string \| (closed: boolean) => string` | Classes to apply to the background that appears behind the modal. Specifying a function for this property is intended for animation by applying different classes when the modal is closed |
| `cssBgOpacity`          | `number`                                | Sets the opacity of the background behind the modal. Defaults to 0.5                                                                                                                       |
| `cssAnimationDuration`  | `number`                                | Will not have any effect unless `Animated` is `true`. Sets the duration of the animation on the background via the `--duration` css variable                                               |

<h2 id="modal">Creating a Modal Component</h2>
You may use any React component as a modal, however a number of props are passed into to the modal that you can take advantage of

Below is a simple implementation for a confirmation modal component.

Note that as async-modal doesnt provide any styles for the modal iteself, you will need to provide your own styles or make use of a UI library such as bootstrap or Material UI. 
```js

const ConfirmationModal = ({data, submit, cancel}) => {
  <div className="modal">
    <div className="modal-header">
      <h3>Confirm Action</h3>
      <button onClick={cancel}>x</button>
    </div>
      <div className="modal-body">
        {data.message}
      <button onClick={() => submit(false)}>Cancel</button>
      <button onClick={() => submit(true)}>Confirm</button>
    </div>
  </div>
}


export default ConfirmationModal;
```

A complete list of the props passed into the modal are:

| Prop        | Description                                                                                                                                           |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `data`      | Object containing data passed to the modal via `useModal`                                                                                             |
| `cancel`    | Calling this function indicates the user has cancelled the modal, for example by pressing the 'x' button that is present in the corner of most modals |
| `submit`    | Similar to cancel, however `submit` allows you to pass some data back to the calling component                                                        |
| `isClosing` | A boolean representing if the modal is closing. This allows you to play an exit animation or transition. To make use of this, ensure that the `animation` option is set to true                                               |

## Functions

<h3 id="modalProvider">`ModalProvider`</h3>
This is a component which wraps your app to provide the modal functionality.

*Basic Usage*
```js
import {ModalProvider} from 'async-modals';
import 'async-modals/dist/style.css';

const App: React.FC = () => {
  return (
    <ModalProvider>
      ...
    </ModalProvider>
  )
}
```

You may also specify default options using the `defaultSettings` prop
```js
import {ModalProvider} from 'async-modals';
import 'async-modals/dist/style.css';

const App: React.FC = () => {
  return (
    <ModalProvider defaultSettings={{
      animated: true
    }}>
      ...
    </ModalProvider>
  )
}
```

<h3 id="useModal">`useModal`</h3>
This hook allows you to show a modal component.

*Basic Usage*
```js
import {useModal} from 'async-modals';
import ModalComponent from '../components/ModalComponent';
...

const modal = useModal(ModalComponent)
```

You can also specify any <a href="#options">options</a> here as well
```ts
import {useModal} from 'async-modals';
import ModalComponent from '../components/ModalComponent'

...

const modal = useModal(ModalComponent, {
  showBg: false,
  AllowContentScrolling: true,
})
```

This returns a modal object with the following methods

| Method                  | Description                                                                                                                                                                                                                                              |
|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `show(options)`         | Display the modal. For `options` you may specify any option, and additionally you may use the `data` property to pass data to the modal. This returns a promise that can be awaited. Any options specified here will override those passed to `useModal` |
| `close()`               | Closes the modal if it is open.                                                                                                                                                                                                                          |
| `updateModalData(data)` | Update the data being displayed in the modal while it is open                                                                                                                                                                                            |                                                                                                                    |

Below is an example of showing an alert modal with a message being passed in

```js

const modal = useModal(AlertModal);

const showAlert = async () => {
  await modal.show({
    data: {
      message: "This is an alert"
    }
  })
};

```

You can also await data being returned from a modal component. The below example shows a modal that gets a user's name and then prints it to the console

> When receieving data from a modal, it is important to check if it exists before using it. In this instance, if the user exits the modal, `name` will be undefined

```js

const welcomeModal = useModal(WelcomeModal);

const welcome = async () => {
  const name = await welcomeModal.show()

  if(name){
    console.log(name);
  }
};

```

<h1 id="contributing">Contributing</h1>
Any contributions, feature suggestions, or bug reports are welcome.


The development of this package has mostly been motivated by my own project requirements and use cases. If there is a feature that you would like to see to support your own use cases, please open an <a href="https://github.com/alexn400/async-modals/issues">Issue</a> or a <a href="https://github.com/alexn400/async-modals/pulls">Pull Request</a>.
## License

MIT Licensed. Copyright (c) Alexander Nicholson 2021.
