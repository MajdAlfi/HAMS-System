export const DocProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserModel | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("User");

    if (storedUser) {
      try {
        const parsed: UserModel = JSON.parse(storedUser);
        setUserData(parsed);
      } catch (e) {
        console.error("Invalid user data in localStorage", e);
        localStorage.removeItem("User");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSignout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("User");
    navigate("/login");
  };

  if (!userData)
    return <div style={{ height: "80vh", width: "85vw" }}>Loading...</div>;
  const date = new Date(userData.DOB);
  return (
    <div style={{ height: "90vh", width: "100vw" }}>
      <div style={{ position: "absolute", top: "12vh", right: 30 }}>
        <button
          style={{
            height: "5vh",
            width: "10vw",
            fontWeight: "bold",
            backgroundColor: "red",
            color: "white",

            fontSize: 18,
          }}
          onClick={handleSignout}
        >
          {" "}
          Signout
        </button>
      </div>

      <img
        src="/src/assets/patientIMGs/prof.jpg"
        style={{
          height: "14vh",
          width: "10vw",
          borderRadius: "10px",
          marginTop: "15vh",
          objectFit: "cover",
        }}
      />
      <h3>Name</h3>
      <h3>DOB: 29/12/2001</h3>
      <h3>address</h3>
      <h3>+44xxxxxxxx</h3>
      <h3>Gender</h3>
      <h3>Account Type</h3>
    </div>
  );
};
