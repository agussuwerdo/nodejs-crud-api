# nodejs-crud-api

## API Specification

```yaml
definitions:
  handler.Item:
    properties:
      id:
        type: string
      name:
        type: string
      price:
        type: integer
    type: object
  handler.PaginatedItemsResponse:
    description: Represents a paginated response for items
    properties:
      items:
        items:
          $ref: '#/definitions/handler.Item'
        type: array
      limit:
        type: integer
      page:
        type: integer
      totalCount:
        description: Add this field
        type: integer
      totalPages:
        description: Add this field
        type: integer
    type: object
  handler.Response:
    description: Represents a standard response for errors or success messages
    properties:
      id:
        type: string
      message:
        type: string
    type: object
info:
  contact: {}
  description: Represents a paginated response for items
paths:
  /items:
    get:
      consumes:
      - application/json
      description: Get all items from the database with pagination
      parameters:
      - description: Page number
        in: query
        name: page
        type: integer
      - description: Number of items per page
        in: query
        name: limit
        type: integer
      produces:
      - application/json
      responses:
        "200":
          description: OK
          schema:
            $ref: '#/definitions/handler.PaginatedItemsResponse'
        "400":
          description: Bad Request
          schema:
            $ref: '#/definitions/handler.Response'
        "500":
          description: Internal Server Error
          schema:
            $ref: '#/definitions/handler.Response'
      summary: Get items
      tags:
      - Items
    post:
      consumes:
      - application/json
      description: Add a new item to the database
      parameters:
      - description: Item to add
        in: body
        name: item
        required: true
        schema:
          $ref: '#/definitions/handler.Item'
      produces:
      - application/json
      responses:
        "201":
          description: Created
          schema:
            $ref: '#/definitions/handler.Item'
        "400":
          description: Bad Request
          schema:
            $ref: '#/definitions/handler.Response'
        "500":
          description: Internal Server Error
          schema:
            $ref: '#/definitions/handler.Response'
      summary: Create item
      tags:
      - Items
  /items/{id}:
    delete:
      description: Delete an item from the database by ID
      parameters:
      - description: Item ID
        in: path
        name: id
        required: true
        type: string
      responses:
        "200":
          description: OK
          schema:
            $ref: '#/definitions/handler.Response'
        "400":
          description: Bad Request
          schema:
            $ref: '#/definitions/handler.Response'
        "404":
          description: Not Found
          schema:
            $ref: '#/definitions/handler.Response'
        "500":
          description: Internal Server Error
          schema:
            $ref: '#/definitions/handler.Response'
      summary: Delete item
      tags:
      - Items
    put:
      consumes:
      - application/json
      description: Update an existing item in the database by ID
      parameters:
      - description: Item ID
        in: path
        name: id
        required: true
        type: string
      - description: Updated item data
        in: body
        name: item
        required: true
        schema:
          $ref: '#/definitions/handler.Item'
      produces:
      - application/json
      responses:
        "200":
          description: OK
          schema:
            $ref: '#/definitions/handler.Response'
        "400":
          description: Bad Request
          schema:
            $ref: '#/definitions/handler.Response'
        "404":
          description: Not Found
          schema:
            $ref: '#/definitions/handler.Response'
        "500":
          description: Internal Server Error
          schema:
            $ref: '#/definitions/handler.Response'
      summary: Update item
      tags:
      - Items
swagger: "2.0"
```