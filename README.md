[![npm](https://img.shields.io/npm/v/async-modals)](https://www.npmjs.com/package/async-modals)
[![Types](https://img.shields.io/npm/types/async-modals.svg)](https://www.npmjs.com/package/async-modals)
[![Downloads](https://img.shields.io/npm/dt/async-modals.svg)](https://www.npmjs.com/package/async-modals)
# Async Modals

Async modals is a hook-based way of showing modals in React using promises.

## Features:
 * **Define once, use anywhere** - once you've written your modal component, you can use it within any other component without duplicating any code!
 * **Flexible** - easily pass data back and forth between the modal and calling component
 * **Un-opinionated styling** - Async Modals doesnt ship with any predefined styles, leaving you free to use it with your favourite css library!
# Installation and usage

To use async-modals install it via npm or yarn
```
yarn add async-modals
```

Then you can start using it:

> Wrap your app in the ModalProvider Component
```tsx
import React from 'react';
import {ModalProvider} from 'async-modals'

const App: React.FC = () => {
  return (
    <ModalProvider backgroundClassName='modal-bg'>
      ...
    </ModalProvider>
  )
}
```

> Define a modal component
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

> Use the modal anywhere
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

## License

MIT Licensed. Copyright (c) Alexander Nicholson 2021.
