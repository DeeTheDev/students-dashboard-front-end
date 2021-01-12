/** @format */

import React, { useState, useEffect } from "react";
import { Progress, Card, Row, Col, Space, Typography, Spin } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;
const MainProgress = () => {
    const [progress, setProgress] = useState(null);
    //Fetching data from airtable
    useEffect(() => {
        const getMentorsData = async () => {
            const response = await fetch(process.env.REACT_APP_AIRTABLE_LINK);
            const progressData = await response.json();
            setProgress(progressData);
        };
        getMentorsData();
        // getMentorsData().then((data) => setProgress(data));
    }, []);
    return (
        <>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Card type="inner" hoverable>
                    <Typography.Title level={4} className="left">
                        Your Progress
                    </Typography.Title>
                    <div className="progress">
                        <Row
                            justify="center"
                            align="middle"
                            gutter={[8, 16]}
                            wrap={false}>
                            {progress ? (
                                progress.records.map((week, index) => {
                                    return (
                                        <Col flex="1 1 150px" key={index}>
                                            <Card
                                                hoverable
                                                style={{
                                                    height: 255,
                                                    textAlign: "center",
                                                    paddingTop: 20,
                                                    marginBottom: 20,
                                                }}
                                                cover={
                                                    <Link to="/home/assignments/">
                                                        {" "}
                                                        <Progress
                                                            type="circle"
                                                            strokeColor={{
                                                                "0%": "#5cdbd3",
                                                                "100%": "#52C41A",
                                                            }}
                                                            strokeWidth={10}
                                                            percent={
                                                                week.fields.Progress
                                                            }
                                                        />
                                                    </Link>
                                                }>
                                                <Meta
                                                    title={week.fields.Lesson}
                                                    description="This is the description"
                                                />
                                            </Card>
                                        </Col>
                                    );
                                })
                            ) : (
                                <Row>
                                    <Col span={12} offset={12}>
                                        <Spin size="large" />
                                    </Col>
                                </Row>
                            )}
                        </Row>
                    </div>
                </Card>
            </Space>
        </>
    );
};
export default MainProgress;