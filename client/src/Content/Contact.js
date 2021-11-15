import React, {useState} from "react";
import {Content} from "antd/es/layout/layout";
import {Button, message, Popover} from "antd";


function Contact() {
    const [marginT, setMarginT] = useState(0);

    console.log(window.innerHeight);
    console.log(marginT);

    const handleMove = () => {
        let newMargin = marginT + 10;
        if (newMargin > window.innerHeight / 20) {
            newMargin = marginT - 10;
        }
        setMarginT(newMargin);
    }

    return (
        <Content
            className="site-layout-background"
            style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
            }}
        >
            <Button type="primary"
                    onMouseEnter={handleMove}
                    onClick={() => {
                        message.warn("Don't report. Just bear with it!")
                    }}
                    style={{marginTop: marginT+"%"}}
            >
                Click me to report an issue.
            </Button>
        </Content>
    )
}

export default Contact;
