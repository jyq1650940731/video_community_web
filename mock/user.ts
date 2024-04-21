function createList(){
    return [
        {userId:1,
        username:'123'}
    ]
}

export default [
    {
        url: '/dev-api/user/login',
        method: 'post',
        response: ({ query }) => {
          console.log(query);
          return {
            code: 200,
            data: {
                token:"1234"
            },
          }
        },
      },
    {
        url:'/dev-api/user/info',
        method:'get',
        response:({body})=>{
            return {code:200,data:{a:1234}}
        }
    }
]