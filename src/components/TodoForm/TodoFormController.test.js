import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MockDate from 'mockdate';
MockDate.set('1/1/2000');
import TodoFormController from "./TodoFormController";

Enzyme.configure({ adapter: new Adapter() });

test("<TodoFormController /> #addTodo", async () => {
  const dispatch = jest.fn();
  const form = mount(
    <TodoFormController
      addTodo={(...args)=>dispatch(...args)}
      login={() => { }}
      uid={1}
      profile={
        {
          email: 'T@E.ST',
          isLoaded: true,
          isEmpty: false
        }
      }
    />
  );

  form.find("input.text").simulate("change", { target: { value: "a new todo" } });
  form.find("button.btn-primary").simulate("click");

  expect(dispatch).toBeCalledWith({ text: "a new todo", datetime: new Date(), priority: 0  }, 1);
});

test("<TodoFormController /> #login", async () => {
  const dispatch = jest.fn();
  const form = mount(
    <TodoFormController 
      addTodo={()=>{/**/}}
      login={(...args)=>dispatch(...args)}
      uid={1}
      profile={
        {
          email: 'T@E.ST',
          isLoaded: true,
          isEmpty: true
        }
      }
    />
  );

  form.find("input.text").simulate("change", { target: { value: "a new todo" } });
  form.find("button.btn-primary").simulate("click");

  expect(dispatch).toBeCalled();
});