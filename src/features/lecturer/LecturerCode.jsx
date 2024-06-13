import React from "react";
import logo from "../../images/logo-revamp.svg";
import {
  Box,
  Flex,
  FormControl,
  Input,
  Text,
  Center,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateCodeMutation } from "./lecturersApiSlice";
export default function LecturerCode() {
  const [updateCode, { isLoading, isSuccess, isError, error }] =
    useUpdateCodeMutation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [universityCode, setUniversityCode] = useState("");
  const [validCode, setValidCode] = useState("");

  const regex = /^[a-zA-Z0-9-]*$/;

  useEffect(() => {
    if (regex.test(universityCode)) {
      setValidCode(universityCode);
    }
  }, [universityCode]);

  useEffect(() => {
    document.body.classList.add("bg-color");
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setUniversityCode("");
      navigate(`/lecturer/${id}`);
    }
  }, [isSuccess, navigate]);

  const handleInputChange = (event) => {
    setUniversityCode(event.target.value);
  };

  const canSave = Boolean(validCode);

  const handleSubmit = async (e) => {
    console.log("submitted", id, universityCode);
    if (canSave) {
      try {
        await updateCode({ id, universityCode: validCode });
      } catch (error) {}
    }
  };
  return (
    <div>
      <Center h="100vh" mt={"-6em"}>
        <Flex direction="column" align="center" justify="center">
          <Box w="25%" pb={"2em"}>
            <img src={logo} alt="logo" />
          </Box>
          <Text pb="1em">Input your University code to proceed</Text>
          <FormControl mb={"2em"}>
            <Input
              placeholder="University Code"
              value={universityCode}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </FormControl>
          <Button
            type="submit"
            w={"50%"}
            backgroundColor={!universityCode ? "grey" : "pink"}
            onClick={handleSubmit}
          >
            Proceed
          </Button>
        </Flex>
      </Center>
    </div>
  );
}