import React from 'react'
import { Table } from 'react-bootstrap'

const MandatModel = () => {
    return(
        <React.Fragment>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Уровень доступа</th>
                        <th>Субъекты</th>
                        <th></th>
                        <th>Объект</th>
                        <th>Уровень секретности</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>с</td>
                        <td>user1</td>
                        <td></td>
                        <td>object1</td>
                        <td>c</td>
                    </tr>
                    <tr>
                        <td>e</td>
                        <td>user2</td>
                        <td></td>
                        <td>object2, object3</td>
                        <td>e</td>
                    </tr>
                    <tr>
                        <td>y</td>
                        <td>user3, user4</td>
                        <td></td>
                        <td>object4</td>
                        <td>y</td>
                    </tr>
                    <tr>
                        <td>в</td>
                        <td>user5</td>
                        <td></td>
                        <td>object5</td>
                        <td>в</td>
                    </tr>
                </tbody>
            </Table>       
        </React.Fragment>
    )
}

export default MandatModel;