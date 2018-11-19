import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";


import TodoListController from "./TodoListController";
import { TodoController } from "../Todo/TodoController";
import { addMinutes } from "date-fns";
import MockDate from 'mockdate';
MockDate.set('1/1/2000');
import { selectTodos } from "../../redux/modules/todos";

Enzyme.configure({ adapter: new Adapter() });

const firebaseTodos = {
  1: {
    1: {
      id: 1,
      text: "a",
      priority: 0,
      datetime: addMinutes(new Date(), 4),

    },
    2: {
      id: 2,
      text: "b",
      priority: 0,
      datetime: addMinutes(new Date(), -5),

    },
    3: {
      id: 3,
      text: "c",
      priority: 1,
      datetime: addMinutes(new Date(), -4),

    },
    4: {
      id: 4,
      text: "d",
      priority: 2,
      datetime: addMinutes(new Date(), 7),

    },
    5: {
      id: 5,
      text: "e",
      priority: 2,
      datetime: addMinutes(new Date(), 1),

    }
  }
}
const todos = selectTodos(firebaseTodos, 1);

test("<TodoList /> #display", async () => {
  const dispatch = () => { };
  const list = mount(
    <TodoListController
      toggleTodo={() => { }}
      todos={todos}
      uid={1}
      notify={() => { }}
    />
  );

  const listItem = (i) => mount(
    <li className="list-group-item" >
      <TodoController {...todos[i]}
        notify={() => { }}
        onCompleteTodo={() => { }} />
    </li>
  ).html()

  expect(
    list
      .find("li")
      .first()
      .html()
  ).toEqual(
    listItem(0)
  );

  expect(
    list
      .find("li")
      .at(1)
      .html()
  ).toEqual(
    listItem(1)
  );

  expect(
    list
      .find("li")
      .at(2)
      .html()
  ).toEqual(
    listItem(2)
  );

  expect(
    list
      .find("li")
      .at(3)
      .html()
  ).toEqual(
    listItem(3)
  );
});

test("<TodoList /> #completeCalls", async () => {
  const dispatch = jest.fn();
  const list = mount(
    <TodoListController
      toggleTodo={dispatch}
      todos={todos}
      uid={1}
      notify={() => { }}
    />
  );

  list.find("button").forEach(b => b.simulate("click"));
  expect(dispatch.mock.calls.length).toBe(5);
});

test("<TodoList /> #notify", async () => {
  const dispatch = jest.fn();
  const list = mount(
    <TodoListController
      toggleTodo={() => { }}
      todos={todos}
      uid={1}
      notify={dispatch}
    />
  );
  expect(dispatch.mock.calls.length).toBe(2);
});
