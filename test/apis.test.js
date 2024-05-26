const request = require('supertest')
const StudentWrap = require('../database/models/Student')

jest.spyOn(StudentWrap, 'getModel').mockImplementation(() => {
    const db = [
        { id: 1, name: 'Hùng', gender: 'Nam', school: 'HUST', birthday: '2003', phoneNumber: '012345678', email: 'hung@gmail.com', country: 'Việt Nam' },
        { id: 2, name: 'Nam', gender: 'Nam', school: 'ITMO', birthday: '2002', phoneNumber: '0999999999', email: 'nam@gmail.com', country: 'Nga' },
        { id: 3, name: 'Lan', gender: 'Nữ', school: 'VNU', birthday: '2004', phoneNumber: '0xxxxxxxxx', email: 'lan@gmail.com', country: 'Việt Nam' }
    ]

    return {
        destroy: ({where}) => db.filter(({id}) => id != where.id),
        findOne: ({where}) => db.find(({id}) => id == where.id),
        findAll: () => db,
        create: (student) => db.push(Object.assign(student, {id: new Date().getTime()})),
        update: (student, {where}) => Object.assign(db.find(({id}) => where.id == id), student)
    }
})

const { app } = require('../src')

describe('[GET] /api/students', () => {
    it('Trả về 1 mảng các sinh viên, mỗi sinh viên phải có ít nhất các thông tin id, name, gender, school', async () => {
        const res = await request(app).get('/api/students')
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body)).toEqual(true)
        res.body.forEach(student => {
            expect(student.id).toBeDefined()
            expect(student.name).toBeDefined()
            expect(student.gender).toBeDefined()
            expect(student.school).toBeDefined()
        })
    })
})

describe('[GET] /api/student', () => {
    it('Trả về mã lỗi 400 và tin nhắn lỗi nếu không chỉ định ID', async () => {
        const res = await request(app).get('/api/student').expect('Content-Type', /json/).expect(400)
        expect(res.body).toHaveProperty('message')
        expect(res.body?.message).toBe('Student ID is required!')
    })

    it('Trả về mã lỗi 400 và tin nhắn lỗi nếu ID không tồn tại', async () => {
        const res = await request(app).get('/api/student?id='+new Date().getTime()).expect('Content-Type', /json/).expect(400)
        expect(res.body).toHaveProperty('message')
        expect(res.body?.message).toBe('Student ID is not existed!')
    })

    it('Trả về object có chứa thông tin của sinh viên, ít nhất có các thông tin id, name, gender, school', async () => {
        const res = await request(app).get('/api/student?id=1').expect('Content-Type', /json/).expect(200)
        expect(res.body.id).toBeDefined()
        expect(res.body.name).toBeDefined()
        expect(res.body.gender).toBeDefined()
        expect(res.body.school).toBeDefined()
    })
})

describe('[POST] /api/student', () => {
    it('Trả về mã lỗi 400 và tin nhắn lỗi nếu thiếu name hoặc gender hoặc school', async () => {
        const inputs = [
            {name: 'Me', gender: 'Nam'},
            {name: 'Me', school: 'HUST'},
            {gender: 'Nam', school: 'HUST'}
        ]
        inputs.forEach(async (input) => {
            const res = await request(app).post('/api/student').send(input).expect('Content-Type', /json/).expect(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body?.message).toBe('Missing values!')
        })
    })

    it('Trả về mã lỗi 400 và tin nhắn lỗi nếu gender không hợp lệ', async () => {
        const input = {name: 'Me', gender: 'Giới tính thứ 3', school: 'HUST'}
        const res = await request(app).post('/api/student').send(input).expect('Content-Type', /json/).expect(400)
        expect(res.body).toHaveProperty('message')
        expect(res.body?.message).toBe('Invalid gender!')
    })

    it('Trả về status 200 nếu tạo thành công', async () => {
        const input = {name: 'Me', gender: 'Nam', school: 'HUST'}
        const res = await request(app).post('/api/student').send(input).expect('Content-Type', /json/).expect(200)
    })
})

describe('[PUT] /api/student', () => {
    it('Trả về mã lỗi 400 và tin nhắn lỗi nếu thiếu id hoặc name hoặc gender hoặc school', async () => {
        const inputs = [
            { id: 1, name: 'Me', school: 'HUST' },
            { name: 'Me', gender: 'Nam' },
            { name: 'Me', school: 'HUST' },
            { gender: 'Nam', school: 'HUST' }
        ]
        inputs.forEach(async (input) => {
            const res = await request(app).put('/api/student').send(input).expect('Content-Type', /json/).expect(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body?.message).toBe('Missing values!')
        })
    })

    it('Trả về mã lỗi 400 và tin nhắn lỗi nếu gender không hợp lệ', async () => {
        const input = { id: 1, name: 'Me', gender: 'Giới tính thứ 3', school: 'HUST' }
        const res = await request(app).put('/api/student').send(input).expect('Content-Type', /json/).expect(400)
        expect(res.body).toHaveProperty('message')
        expect(res.body?.message).toBe('Invalid gender!')
    })

    it('Trả về status 200 nếu cập nhật thành công', async () => {
        const input = {id: 1, name: 'Me', gender: 'Nam', school: 'HUST'}
        const res = await request(app).put('/api/student').send(input).expect('Content-Type', /json/).expect(200)
    })
})

describe('[DELETE] /api/student', () => {
    it('Trả về mã lỗi 400 và tin nhắn lỗi nếu không chỉ định ID', async () => {
        const res = await request(app).delete('/api/student').expect('Content-Type', /json/).expect(400)
        expect(res.body).toHaveProperty('message')
        expect(res.body?.message).toBe('ID is required!')
    })

    it('Trả về status 200 nếu xóa thành công', async () => {
        const res = await request(app).delete('/api/student').send({ id: 1 }).expect('Content-Type', /json/).expect(200)
    })
})

afterAll(() => {
    app.closeAllConnections()
})
