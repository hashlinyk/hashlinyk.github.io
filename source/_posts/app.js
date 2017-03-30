import 'babel-polyfill';    //可按需选择是否加载
import React from 'react';
import ReactDOM from 'react-dom';

class Person extends React.Component{
    render() {//开头花括号一定要和小括号隔一个空格，否则识别不出来
        return (
            <div>
                <p>姓名：{this.props.name}</p>
                <p>性别：{this.props.sex}</p>
                <p>年龄：{this.props.age}</p>
            </div>    
        );
    }
} 

ReactDOM.render(
    <Person name='Erick' sex='male' age='23' />,
     document.getElementById('app')
);  