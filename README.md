# <img src='https://user-images.githubusercontent.com/22328523/101976830-2a152f80-3c6f-11eb-9a73-87e7bcc32a2a.png' height="100px" alt='Rootz JS' />

[![build status](https://img.shields.io/travis/com/rootzjs/rootzjs-core?style=flat-square)](https://travis-ci.com/rootzjs/rootzjs-core)
[![npm version](https://img.shields.io/npm/v/@rootzjs/core?style=flat-square)](https://www.npmjs.com/package/@rootzjs/core)
[![npm downloads](https://img.shields.io/npm/dt/@rootzjs/core?style=flat-square)](https://www.npmjs.com/package/@rootzjs/core)
[![git search](https://img.shields.io/github/search/rootzjs/rootzjs-core/rootz?style=flat-square)](https://github.com/rootzjs/rootzjs-core)
[![licence](https://img.shields.io/github/license/rootzjs/rootzjs-core?style=flat-square)](https://www.npmjs.com/package/@rootzjs/core)
[![package size](https://img.shields.io/bundlephobia/minzip/@rootzjs/core?style=flat-square)](https://www.npmjs.com/package/@rootzjs/core)
[![last commit](https://img.shields.io/github/last-commit/rootzjs/rootzjs-core?style=flat-square)](https://github.com/rootzjs/rootzjs-core/graphs/commit-activity)

Rootz JS, is an open source JavaScript Library for maintaining application state.

## Documentation

You can find the Rootz Documentation on the [**Website**](https://rootzjs.org).

Checkout the [**Getting Started**](https://rootzjs.org/#/introduction) page for a quick overview.

- [**Introduction**](https://rootzjs.org/#/introduction)
- [**Installation**](https://rootzjs.org/#/installation)
- [**Concepts**](https://rootzjs.org/#/components)
- [**Workbook**](https://rootzjs.org/#/overview)


## Rootz Devtools
**Rootz Devtools** provides a incomparable coding and debugging experience. It provides see through visualization to the application's Root. 

For more info, visit [**devtools.rootzjs.org**](http://devtools.rootzjs.org/) (*currently in development with additional features*).

## Examples

- [**Todo App**](https://github.com/rootzjs/examples-todo-with-ui) - [**Demo**](https://rootzjs.github.io/examples-todo-with-ui/)


## Installation

Official Rootz JS template for [Create React App](https://github.com/facebook/create-react-app)

```sh
npx create-react-app my-app --template rootzjs
```

To install the core library with npm:
```sh
npm install —-save @rootzjs/core
```

with yarn:
```sh
yarn add --dev @rootzjs/core
```

Once all the dependencies are installed, we are all set to use Rootz.

## Learning

Now as you are all ready to use Rootz, lets go through the implementation of the concepts we know so far.

### Node

A Node represents a stateful component in your Rootz application. You can create a Node with a **createNode** hook which Rootz provides. The createNode hook accepts a unique Id NODE_ID of type string and a Component (*Functional or Class*). 

In return it provides an array of 2, first an Object **node** while the later being a HOF (*High Order Function*) **dispatchNode**. 

> **Note**: The node object has few helper methods for creating Actions and Contract (*discussed in later examples*). It holds Id, Component, State and other details of the Node.

Calling the dispatchNode function returns a Component (*Which basically is the passed Component with additional features*).

```js
import { createNode } from '@rootzjs/core';

/*
* @param-01: NODE_ID
* @type: string
* 
* @param-02: Component
* @type: {React.FunctionalComponent} / {React.ClassComponent}
* 
* @Component-arguments:  { props, state, actions, profile }
* @type: NodeProps
* @proptype: Object
*/
const [node, dispatchNode] = createNode("MyFirstNode", NodeProps => {
	return (
	    {YOUR JSX ELEMENTS GOES HERE}
    )
});

// MyFirstNode is a Component
export const MyFirstNode = dispatchNode(node);
```
> ***Tips***: *Keeping the name of NODE_ID and Component same helps in better Identification.*

#### NodeProps

**NodeProps** is an Object passed as an argument to the Component defined in a Node. It can be destructured to ***props***, ***state***, ***actions***, ***profile***. 

##### props
Parameters which are passed by the parent (*Caller*) Component / Node.

##### state
The state object which you have defined using **node.state** method.

##### actions
Actions can be created using methods defined in node object. Same goes with contract. (*explained in later sections*).

##### profile 
Profile are simply an utilization of the concept of Context in React. It helps in storing the most generic information.

> **Note**: We will be discussing about state, actions and profile in details ahead.

### State

A State is a simple JavaScript Object. You need to define the state to access it inside the Component. The method **state** takes an Object as a parameter.

```js
import { createNode } from '@rootzjs/core';

const [node, dispatchNode] = createNode("MyFirstNode", ({
    state,
}) => {
	return (
	    <p>{state.message}</p>
    )
});

// Defining the State of a Node
node.state({
	message: "Yay! I just created my first Node State"
});

export const MyFirstNode = dispatchNode(node);
```

### Actions

Actions are functions which returns Objects. The returned object signifies a newer state which will be merged to the existing state of the application. 

Node provides methods to create Actions **useAction**, **useActionCallback**, **useActionWith**

#### useAction
This takes ACTION_ID and an Object or function as a parameter. 

##### A Pure Action
In case the parameter is passed as an Object, Rootz creates a function with the name ACTION_ID. This function can then be accessed within the Component with property **actions** of NodeProps. A Pure Action.

##### A Callback Action
If a function is passed as a parameter, the same can then be accessed within the Component by property **actions** of NodeProps with the name defined in ACTION_ID.
The callback provides the state of the Node as the first argument, followed by the array of props passed.

```js
import { createNode } from '@rootzjs/core';

const [node, dispatchNode] = createNode("MyFirstNode", ({
    state,
    actions,
}) => {
	return (
    	<React.Fragment>
        	{
            	state.message ?
	            	<p>{state.message}</p>
                    :
                    <p>No Message to display</p>
        	}
            <button onClick={actions.ADD_MESSAGE}>Add Message</button>
        </React.Fragment>
	    
    )
});

node.state({ 
	message: null 
});

// create action for updating the state on btn click
node.useAction(
    "ADD_MESSAGE", 
    { 
    	message: "Yay! I just created my first Action" 
    }
);

export const MyFirstNode = dispatchNode(node);
```

#### useActionCallback
This is similar to useAction method with function as a parameter. A Callback Action.

```js
import { createNode } from '@rootzjs/core';

const [node, dispatchNode] = createNode("MyFirstNode", ({
    state,
    actions,
}) => {
	return (
    	<React.Fragment>
        	{
            	state.message ?
	            	<p>{state.message}</p>
                    :
                    <p>No Message to display</p>
        	}
            <button onClick={() => actions.ADD_MESSAGE("Action", "Callback")}>Add Message</button>
        </React.Fragment>
	    
    )
});

node.state({ 
	message: null 
});

node.useActionCallback(
	"ADD_MESSAGE", 
	(state, [text1, text2]) => ({ 
		message: `Yay! I just created my first ${text1} ${text2}`
	})
);

export const MyFirstNode = dispatchNode(node);
```
The **state** represents the current state of the Node MyFirstNode. followed by the props passed.
### Contract

An Action updates the state of the node within its scope. What if you want to update any other Node, which is currently not within the scope in which the action is defined. Here comes the concept of a **Contract**. 

A Contract is an agreement made with an Action to update a particular Node.

Node provides methods to create Contract **useContract** and **useContractCallback**.

#### useContract 
Is a pure Action which takes 3 parameters, forNode which states which Node to be updated, ACTION_ID and an Object or a function.

#### useContractCallback 
similarly useContractCallback takes forNode and a function as a parameter. The callback provides the state of the **target** Node as the first argument, followed by the array of props passed.

###### NodeA.js
```js
import { createNode } from '@rootzjs/core';

const [node, dispatchNode] = createNode("NodeA", ({
    state
}) => {
	if(state.message) {
    	return (
        	<p>{state.message}</p>
        )
    } else {
	    return (
        	<p>No Message to display</p>
        )
    }
});

node.state({ 
	message: null 
});

export const NodeA = dispatchNode(node);
```
In the above example I have created a Node as **NodeA** which has a state variable ***message*** defined as null. NodeA would output **No Message to display**. This is understood. 

Let's create a Node as **NodeB** which would have a Contract made with NodeA to update the message variable.

###### NodeB.js (with useContract)
```js
import { createNode } from '@rootzjs/core';

const [node, dispatchNode] = createNode("NodeB", ({
    actions
}) => {
    	return (
        	<button onClick={actions.ADD_MESSAGE}>Add Message</button>
        )
});

node.useContract(
    "NodeA",
    "ADD_MESSAGE", 
	{ 
		message: "Yay! I just created my first Contract" 
	}
);

export const NodeB = dispatchNode(node);
```
Now when the user clicks on the Add Message button, action ADD_MESSAGE will be called. The existing state of NodeA will be updated with the new state. Thus printing the message "Yay! I just created my first Contract".


The same goes for the useContractCallback.
###### NodeB.js (with useContractCallback)
```js
import { createNode } from '@rootzjs/core';

const [node, dispatchNode] = createNode("NodeB", ({
    actions
}) => {
    	return (
        	<button onClick={() => actions.ADD_MESSAGE("Contract", "Callback")}>Add Message</button>
        )
});

node.useContractCallback(
	"NodeA",
	"ADD_MESSAGE", 
	(state, [text1, text2]) => ({ 
		message: `Yay! I just created my first ${text1} ${text2}`
	})
);

export const NodeB = dispatchNode(node);

```
In the above example **NodeB.js (with useContractCallback)** the first argument **state** will represent the current state of **NodeA.js**, followed by the list of parameters passed by the action ADD_MESSAGE.

### Profile
Profile is similar to the concept of Bus in Networks. It helps you to store application specific generic data which could be accessible at any point within the application execution.

You can add data to profile by **setProfile(Object)** method. setProfile takes an Object as a parameter. Profiles can be set through various means.

```js
import { createNode } from '@rootzjs/core';

const [node, dispatchNode] = createNode("MyFirstNode", ({
    profile
}) => {
    	return (
        	 {YOUR JSX ELEMENTS GOES HERE}
        )
});

node.setProfile({
	sessionId: "9694dca333f01433ecb179d32251c946"
});

export const MyFirstNode = dispatchNode(node);
```

> **Note**: The profile if set through the node method (**node.setProfile**) can be accessed throughout the component irrespective to where it has been set. While in case of setProfile method imported as mentioned below should be set before the other components tries to fetch it.

```js
import { setProfile } from '@rootzjs/core';
...

// storing a sessionId in the profile
setProfile({
	sessionId: "9694dca333f01433ecb179d32251c946"
});
```
Within a Node you can access the application Profile from **profile** property of NodeProps.

> **Note**: You can only access data from the profile if it is added before it is being fetched. Try adding profiles in the higher hierarchy Nodes.

```js
import { createNode } from '@rootzjs/core';

const [node, dispatchNode] = createNode("MyFirstNode", ({
    profile, // Application Profile can be accessed here
}) => {
    return (
		<p>{state.message}</p>
    )
});
```

Outside a Node you can access them from the **getProfile()** method.

```js
import { getProfile } from '@rootzjs/core';
...

// accessing profile
const sessionId = getProfile()["sessionId "];
```
> **Note**: Hey, We are still working on the documentations and few examples for better understanding of its usage.

## Thanks
To all those who have inspired me to come up with a new JavaScript state management tool.

#### Key Inspiration 
I came across a very famous Restuarant, visited by more than 4.8 Million every week. When I personally visited that place I found as if I had to cook my own food, with so many procedures to be followed, even for a simple task of drinking water ;)

**This struck me, and became an inspiration for Rootz JS**.

#### But Why Rootz?
We donot expect you to cook when you visit our Restuarant. Just let us know what will you have and we would handle the rest. FYI feel free to drink as much water you want. You donot have to even mention about it. :D

## License
ISC
