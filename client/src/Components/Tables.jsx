import React from "react"
import { Table, Form } from "react-bootstrap"

export function Tables() {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th colSpan={1}>Laboratory group</th>
          <th colSpan={6}>### Group num ###</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Temat #X: ..........</th>
          <th>Category 0</th>
          <th>Category 1</th>
          <th>Category 2</th>
          <th>Category 3</th>
          <th>File uploaded</th>
          <th>Grade is set</th>
        </tr>
      </tbody>
      <thead>
        <tr>
          <th>Imie Nazw 1</th>
          <th>
            <Form.Select>
              <option value="Grade5">5</option>
              <option value="Grade4">4</option>
              <option value="Grade3">3</option>
              <option value="Grade2">2</option>
            </Form.Select>
          </th>
          <th>
            <Form.Select>
              <option value="Grade5">5</option>
              <option value="Grade4">4</option>
              <option value="Grade3">3</option>
              <option value="Grade2">2</option>
            </Form.Select>
          </th>
          <th>
            <Form.Select>
              <option value="Grade5">5</option>
              <option value="Grade4">4</option>
              <option value="Grade3">3</option>
              <option value="Grade2">2</option>
            </Form.Select>
          </th>
          <th>
            <Form.Select>
              <option value="Grade5">5</option>
              <option value="Grade4">4</option>
              <option value="Grade3">3</option>
              <option value="Grade2">2</option>
            </Form.Select>
          </th>
          <th>...</th>
          <th>...</th>
        </tr>
        <tr>
          <th>Imie Nazw 2</th>
          <th>
            <Form.Select>
              <option value="Grade5">5</option>
              <option value="Grade4">4</option>
              <option value="Grade3">3</option>
              <option value="Grade2">2</option>
            </Form.Select>
          </th>
          <th>
            <Form.Select>
              <option value="Grade5">5</option>
              <option value="Grade4">4</option>
              <option value="Grade3">3</option>
              <option value="Grade2">2</option>
            </Form.Select>
          </th>
          <th>
            <Form.Select>
              <option value="Grade5">5</option>
              <option value="Grade4">4</option>
              <option value="Grade3">3</option>
              <option value="Grade2">2</option>
            </Form.Select>
          </th>
          <th>
            <Form.Select>
              <option value="Grade5">5</option>
              <option value="Grade4">4</option>
              <option value="Grade3">3</option>
              <option value="Grade2">2</option>
            </Form.Select>
          </th>
          <th>...</th>
          <th>...</th>
        </tr>
      </thead>
    </Table>
  )
}
