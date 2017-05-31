describe('Routes: Index', () => {
  describe('GET *', () => {
    it('Message when it gets to the first page', (done) => {
      request.get('*')
         .expect(200)
         .end((err, res) => {
           const expected = { message: 'Welcome to hopeaz dms' };
           expect(res.body).to.eql(expected);
           done(err);
         });
    });
  });
});
