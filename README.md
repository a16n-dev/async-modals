[![npm](https://img.shields.io/npm/v/async-modals)](https://www.npmjs.com/package/async-modals)
[![Types](https://img.shields.io/npm/types/async-modals.svg)](https://www.npmjs.com/package/async-modals)
[![Downloads](https://img.shields.io/npm/dt/async-modals.svg)](https://www.npmjs.com/package/async-modals)
# Async Modals

Async modals is a hook-based way of showing modals in React using promises.

# Installation and usage

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
```tsx
import React from 'react';
import {Modal} from 'async-modals'

const MyModal: React.FC<Modal<{name: string}, void>> = ({data, submit}) => {
  return (
    <div>
      welcome, {data.name}!
      <button onClick={() => submit()}>Close Modal</button>
    </div>
  )
}
```

Use the modal anywhere
```tsx
import React from 'react';
import {useModal} from 'async-modals'
import MyModal from './MyModal'

const Page: React.FC = () => {

  const modal = useModal(MyModal);

  const handleClick = async () => {
    //show the modal to the user
    await modal.show({
      data: {
        name: 'Bob'
      }
    });
  }

  return (
    <div>
      <button onClick={() => handleClick()}>Open Modal</button>
    </div>
  )
}
```

<h2 id="options">Options</h2>
You may change the default values of any of these options by passing them to the `defaultSettings` prop of the modal provider

| Option                  | Type                                    | Description                                                                                                                                                                                |
|-------------------------|-----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `canClose`              | `boolean`                               | If `true`, the user can click on the background to close the modal. Set to `true` by default                                                                                               |
| `showBg`                | `boolean`                               | Show a semi-transparent background behind the modal (see also `cssBgOpacity`). Set to `true` by default                                                                                    |
| `AllowContentScrolling` | `boolean`                               | Allow the user to scroll the content of the page while the modal is open. Set to `false` by default                                                                                        |
| `Animated`              | `boolean`                               | Set this to true if you want to use animations or transitions (see animation section for more info)                                                                                        |
| `containerClassName`    | `string`                                | classes to apply to the modal container.                                                                                                                                                   |
| `BackgroundClassName`   | `string \| (closed: boolean) => string` | Classes to apply to the background that appears behind the modal. Specifying a function for this property is intended for animation by applying different classes when the modal is closed |
| `cssBgOpacity`          | `number`                                | Sets the opacity of the background behind the modal. Defaults to 0.5                                                                                                                       |
| `cssAnimationDuration`  | `number`                                | Will not have any effect unless `Animated` is `true`. Sets the duration of the animation on the background via the `--duration` css variable                                               |

## Functions
### `useModal`
This hook allows you to show a modal component.

*Basic Usage*
```ts
import ModalComponent from '../components/ModalComponent'

...

const modal = useModal(ModalComponent)
```

You can also specify any <a href="#options">options</a> here as well
```ts
import ModalComponent from '../components/ModalComponent'

...

const modal = useModal(ModalComponent, {
  showBg: false,
  AllowContentScrolling: true,
})
```

This returns a modal object with the following methods

| Method                  | Description                                                                                                                                                                                                                                              |   |
|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---|
| `show(options)`         | Display the modal. For `options` you may specify any option, and additionally you may use the `data` property to pass data to the modal. This returns a promise that can be awaited. Any options specified here will override those passed to `useModal` |   |
| `close()`               | Closes the modal if it is open.                                                                                                                                                                                                                          |   |
| `updateModalData(data)` | Update the data being displayed in the modal while it is open                                                                                                                                                                                            |   |                                                                                                                      |   |

Below is an example of showing an alert modal with a message being passed in
```js
...

const modal = useModal(AlertModal);

const showAlert = async () => {
  await modal.show({
    data: {
      message: "This is an alert"
    }
  })
};
...
```

## License

MIT Licensed. Copyright (c) Alexander Nicholson 2021.
