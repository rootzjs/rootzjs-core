# <img src='https://raw.githubusercontent.com/rootzjs/rootzjs-core/master/assets/images/logo-avg.png?token=AFKLJS4EB5PRWS3WAF4YU6C72PP4U' height="40px" alt='Rootz JS' />  Rootz JS

Rootz JS, is an open source JavaScript Library for maintaining application state.

It makes it easy to manage the state of your application. Another way of looking at this is, it helps you manage the data you display and how you respond to user actions. It helps you to view your application state as a whole at any point during application run. 

Rootz, helps you write applications with complete hold over its state. This makes it possible for you to monitor changes happening at each component level.

Just think of it as a root of a plant, which starts as a single node (*index.js*). As you go deeper it spreads into interconnected bunch of nodes. A way to visualize your applications.

> **Note**: Presently Rootz JS is made with React in mind. We are planning to extend support to other JavaScript Libraries & Frameworks.

## Rootz Devtools
**Rootz Devtools** provides a incomparable coding and debugging experience. It provides see through visualization to the application's Root. 

For more info, visit [**devtools.rootzjs.org**](http://devtools.rootzjs.org/) (*currently in development with additional features*).

## Getting to know more… 

To implement Rootz, basic understanding of JavaScript would do just fine. 


There are four key elements which one needs to be aware of for implementing Rootz. 

### Node
- A Node represents a React Component.
- All Nodes have a unique Id, called as NODE_ID.
- Each Node has it's own state which internally is a part of the Application Root.
- A React-Rootz application depicts a Root (*A Tree in DS terms*) with interconnected Nodes.
- An instance of Node provides helper methods to create Actions and Contracts.


### Root
- A Root is basically a tree (*in DS terms*), which is defined with the instances of all the Nodes in an Application.
- It is true to the application's current state, hence the only source of truth.


### Actions
- Actions are functions which updates the state of the Node in which it is defined.
- An Action should always return a JavaScript Object.
- Actions are limited to the scope of the Node it is defined in.


### Contract
- Contract is an agreement made to update the state of any Node in the Application, accept the one in which it is defined (*for which we have Actions*).
- Contract is an Action by nature, with an only difference; that it updates the state of other Nodes.


## The Core Principles

The nature of Rootz can be defined with the help of these Core Principles

#### 1. A Root is the only source of truth.
State of each Node defines the state of the Root, hence defining the current state of your application. This makes it easy to maintain state in multiple component applications.

#### 2. A stateful component is a Node.
A stateful component in a Rootz application should be a Node. This makes it a part of the application Root, providing it access to the other Nodes and their state.

#### 3. State of a Node can only be updated through Actions or Contract.
The only way to change the application state is through Actions or Contract.

#### 4. Actions or Contract should only be created with the helper Methods provided by the instance of a Node.
The helper methods are an inbuilt functionalities which provides a boilerplate to create Actions or Contract. This is so, because they are pushed as a property to a Node during the runtime.

## Our Philosophy

**It is not mandatory, but a good practice**

We use a **Define first use later** and **Bits and Pieces**  philosophy in our application design. Roots JS too is built on the very same philosophy. Think of it as designing an automobile (*a car or a motorcycle*). You would first define the purpose of building one. Later divide the task of defining the Shape, Materials and other properties based on your initial decisions into smaller bits and pieces. And finally work over them and integrate. 

Similarly, this philosophy goes great with all the fundamentals of Development. In Rootz we intend to follow it for better results.  

- First define the structure of your application. 
- Break application functionalities into smaller modules. 
- Define which modules would be a Node.
- Define relation between the Nodes.
- Define Actions within Nodes.
- Define Contract based on the relation between Nodes.

These steps are not mandatory to follow, but following them would surely help in building an application with loosely-coupled components reducing maintainability efforts and faster extendability of functionalities.


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

## Getting Started...

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
The state object which you have defined using **node.defineState** method.

##### actions
Actions can be created using methods defined in node object. Same goes with contract. (*explained in later sections*).

##### profile 
Profile are simply an utilization of the concept of Context in React. It helps in storing the most generic information.

> **Note**: We will be discussing about state, actions and profile in details ahead.

### State

A State is a simple JavaScript Object. You need to define the state to access it inside the Component. The method **defineState** takes an Object as a parameter.

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
node.defineState({
	message: "Yay! I just created my first Node State"
});

export const MyFirstNode = dispatchNode(node);
```

### Actions

Actions are functions which returns Objects. The returned object signifies a newer state which will be merged to the existing state of the application. 

Node provides methods to create Actions **createAction** and **createActionCallback** 

#### createAction
This takes ACTION_ID and an Object or function as a parameter. 

##### A Pure Action
In case the parameter is passed as an Object, Rootz creates a function with the name ACTION_ID. This function can then be accessed within the Component by property **actions** of NodeProps. This is normally done when a user does not have any parameters to be passed to the action. A Pure Action.

##### A Callback Action
If a function is passed as a parameter, the same can then be accessed within the Component by property **actions** of NodeProps with the name defined in ACTION_ID.

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

node.defineState({ 
	message: null 
});

// create action for updating the state on btn click
node.createAction(
    "ADD_MESSAGE", 
    { 
    	message: "Yay! I just created my first Action" 
    }
);

export const MyFirstNode = dispatchNode(node);
```

#### createActionCallback
This is similar to createAction method with function as a parameter. A Callback Action.

```js
...

node.createActionCallback(
	"ADD_MESSAGE", 
	() => ({ 
	message: "Yay! I just created my first Action Callback" 
	})
);

```

### Contract

An Action updates the state of the node within its scope. What if you want to update any other Node, which is currently not within the scope in which the action is defined. Here comes the concept of a **Contract**. 

A Contract is an agreement made with an Action to update a particular Node.

Node provides methods to create Contract **createContract** and **createContractCallback**.

#### createContract 
Is a pure Action which takes 3 parameters, forNode which states which Node to be updated, ACTION_ID and an Object or a function.

#### createContractCallback 
similarly createContractCallback takes forNode and a function as a parameter.

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

node.defineState({ 
	message: null 
});

export const NodeA = dispatchNode(node);
```
In the above example I have created a Node as **NodeA** which has a state variable ***message*** defined as null. NodeA would output **No Message to display**. This is understood. 

Let's create a Node as **NodeB** which would have a Contract made with NodeA to update the message variable.

###### NodeB.js
```js
import { createNode } from '@rootzjs/core';

const [node, dispatchNode] = createNode("NodeB", ({
    actions
}) => {
    	return (
        	<button onClick={actions.ADD_MESSAGE}>Add Message</button>
        )
});

node.createContract(
    	"NodeA",
    	"ADD_MESSAGE", 
	{ 
	message: "Yay! I just created my first Contract" 
	}
);

export const NodeB = dispatchNode(node);
```
Now when the user clicks on the Add Message button, action ADD_MESSAGE will be called. The existing state of NodeA will be updated with the new state. Thus printing the message "Yay! I just created my first Contract".


The same goes for the createContractCallback.
```js
...

node.createContractCallback(
	"NodeA",
	"ADD_MESSAGE", 
	() => ({ 
	message: "Yay! I just created my first Contract Callback" 
	})
);

```

### Profile
Profile is similar to the concept of Bus in Networks. It helps you to store application specific generic data which could be accessible at any point within the application execution.

You can add data to profile by **addProfile(Object)** method. addProfile takes an Object as a parameter.

```js
import { addProfile } from '@rootzjs/core';
...

// storing a sessionId in the profile
addProfile({
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
