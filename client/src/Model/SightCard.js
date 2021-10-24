import {Card} from "antd";
import {EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";


function SightCard(props) {
    return (
        <Card
            style={{width: 300}}
            cover={
                <img
                    alt={props.name}
                    src={props.img}
                />
            }
            actios={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Meta
                title={props.name}
                description={props.description}
            />
        </Card>
    );
}

export default SightCard;
