var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies;

// create engine
var engine = Engine.create(),
    world = engine.world;

// create renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 1600,
        height: 600,
        wireframes: false,
        background: '#FFE3E3'
    }
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);


var squareStack = Composites.stack(40, 60, 4, 4,0,0,  function (x, y) {
    return Bodies.rectangle(x, y, 40, 40, {
        render: {
            fillStyle: '#3DB2FF',
            strokeStyle: 'black',
            lineWidth:2
            
        }
    });
});

var circleStack = Composites.stack(300, 60, 4, 4,0,0,  function (x, y) {
    return Bodies.circle(x, y, 20, {
        render: {
            fillStyle: '#B980F0',
            strokeStyle: 'black',
            lineWidth:1
        }
    });
});
var octagonStack= Composites.pyramid(500, 60,11,6,0,0,  function (x, y) {
    return Bodies.polygon(x, y, 8, 20, {
        render: {
            fillStyle: '#FFB830',
            strokeStyle: 'black',
            lineWidth:2
        }
    });
});
var trapezoidStack = Composites.stack(900, 60,4,5,0,0,  function (x, y) {
    return Bodies.trapezoid(x, y, 40, 40,0.5,  {
        render: {
            fillStyle: '#FF2442',
            strokeStyle: 'black',
            lineWidth:2
        }
    });
});

var triangleStack = Composites.pyramid(1100, 60,11,6,0,0,  function (x, y) {
    return Bodies.polygon(x, y, 3, 20, {
        render: {
            fillStyle: '#C2FFD9',
            strokeStyle: 'black',
            lineWidth:2
        }
    });
});

//create ground
ground = Bodies.rectangle(750, 606, 1600, 50.5, { isStatic: true });

Composite.add(world, [circleStack,squareStack,trapezoidStack,triangleStack,octagonStack,ground]);

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;
