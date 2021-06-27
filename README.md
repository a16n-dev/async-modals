[![npm](https://img.shields.io/npm/v/async-modals)](https://www.npmjs.com/package/async-modals)
[![Types](https://img.shields.io/npm/types/async-modals.svg)](https://www.npmjs.com/package/async-modals)
# Async Modals

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

import ''
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


const App: React.FC = () => {

  const {show} = useModal(MyModal);

  const handleClick = async () => {
    //show the modal to the user
    await show({
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
